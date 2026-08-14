// Cloudflare Pages Function
// Route: POST /api/document-upload
// Creates a customer-named folder in Google Drive, uploads the submitted files,
// and writes request-info.txt with the form details.
//
// Required Cloudflare secrets:
//   GOOGLE_CLIENT_ID
//   GOOGLE_CLIENT_SECRET
//   GOOGLE_REFRESH_TOKEN
//
// Optional environment variable:
//   GOOGLE_DRIVE_PARENT_FOLDER_ID
// Default parent folder is the Meridian Website Uploads folder supplied by the owner.

const DEFAULT_PARENT_FOLDER_ID = "1_Rp7zDUMzOwXIE-uLMhm-bw1BToDhRK_";
const MAX_FILES = 10;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png", "doc", "docx"]);

export async function onRequestPost(context) {
  const { request, env } = context;

  let form;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid upload request." }, 400);
  }

  // Honeypot: silently accept likely bot submissions without storing anything.
  if (String(form.get("website") || "").trim()) {
    return jsonResponse({ ok: true });
  }

  const name = cleanText(form.get("name"), 120);
  const email = cleanText(form.get("email"), 180);
  const phone = cleanText(form.get("phone"), 60);
  const requestType = cleanText(form.get("requestType"), 160);
  const notes = cleanText(form.get("notes"), 4000);
  const documents = form.getAll("documents").filter((item) => item instanceof File && item.size > 0);

  if (!name || !email || !requestType || !documents.length) {
    return jsonResponse({ error: "Please complete the required fields and attach at least one document." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }
  if (documents.length > MAX_FILES) {
    return jsonResponse({ error: `Please upload no more than ${MAX_FILES} files at a time.` }, 400);
  }

  let totalBytes = 0;
  for (const file of documents) {
    const ext = extensionOf(file.name);
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return jsonResponse({ error: `${file.name} is not an accepted file type.` }, 400);
    }
    if (file.size > MAX_FILE_BYTES) {
      return jsonResponse({ error: `${file.name} is larger than 10 MB.` }, 400);
    }
    totalBytes += file.size;
  }
  if (totalBytes > MAX_TOTAL_BYTES) {
    return jsonResponse({ error: "The combined upload is larger than 50 MB." }, 400);
  }

  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REFRESH_TOKEN) {
    return jsonResponse({ error: "Document storage is not configured yet." }, 500);
  }

  const parentFolderId = env.GOOGLE_DRIVE_PARENT_FOLDER_ID || DEFAULT_PARENT_FOLDER_ID;
  const requestId = createRequestId();

  try {
    const accessToken = await getAccessToken(env);
    // Per business requirement, the Drive folder uses the submitted Full Name.
    const folder = await createDriveFolder(accessToken, parentFolderId, safeDriveName(name));

    const uploaded = [];
    for (const file of documents) {
      const storedName = safeDriveName(file.name) || `document-${uploaded.length + 1}`;
      const result = await uploadDriveFile(accessToken, folder.id, storedName, file.type || mimeFromExtension(extensionOf(file.name)), file);
      uploaded.push({ id: result.id, name: storedName, size: file.size });
    }

    const submittedAt = new Date().toISOString();
    const infoText = buildInfoText({ requestId, submittedAt, name, email, phone, requestType, notes, uploaded });
    await uploadDriveFile(accessToken, folder.id, "request-info.txt", "text/plain; charset=utf-8", new Blob([infoText], { type: "text/plain" }));

    // Email notification is intentionally non-blocking. The Drive upload is the
    // primary transaction; a temporary email-provider issue must not make the
    // customer think their documents were lost after they were stored successfully.
    let emailNotification = "not-configured";
    if (env.RESEND_API_KEY) {
      try {
        await sendUploadNotification(env, {
          requestId,
          submittedAt,
          name,
          email,
          phone,
          requestType,
          notes,
          uploaded,
          folderId: folder.id
        });
        emailNotification = "sent";
      } catch (emailError) {
        emailNotification = "failed";
        console.error("Document upload email notification error:", emailError);
      }
    }

    return jsonResponse({ ok: true, requestId, filesUploaded: uploaded.length, emailNotification });
  } catch (error) {
    console.error("Google Drive upload error:", error);
    return jsonResponse({ error: "We could not store the documents right now. Please try again shortly." }, 502);
  }
}

async function getAccessToken(env) {
  const body = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    refresh_token: env.GOOGLE_REFRESH_TOKEN,
    grant_type: "refresh_token"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(`Unable to refresh Google access token: ${data.error || response.status}`);
  }
  return data.access_token;
}

async function createDriveFolder(accessToken, parentFolderId, folderName) {
  const response = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,name", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId]
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) throw new Error(`Unable to create Drive folder: ${data.error?.message || response.status}`);
  return data;
}

async function uploadDriveFile(accessToken, folderId, fileName, mimeType, body) {
  const size = body.size ?? undefined;
  const initResponse = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Type": mimeType,
      ...(Number.isFinite(size) ? { "X-Upload-Content-Length": String(size) } : {})
    },
    body: JSON.stringify({ name: fileName, parents: [folderId] })
  });
  if (!initResponse.ok) {
    const detail = await initResponse.text();
    throw new Error(`Unable to start Drive upload: ${detail || initResponse.status}`);
  }
  const uploadUrl = initResponse.headers.get("Location");
  if (!uploadUrl) throw new Error("Google Drive did not return an upload location.");

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": mimeType,
      ...(Number.isFinite(size) ? { "Content-Length": String(size) } : {})
    },
    body
  });
  const data = await uploadResponse.json().catch(() => ({}));
  if (!uploadResponse.ok || !data.id) throw new Error(`Unable to upload file to Drive: ${data.error?.message || uploadResponse.status}`);
  return data;
}

async function sendUploadNotification(env, details) {
  const { requestId, submittedAt, name, email, phone, requestType, notes, uploaded, folderId } = details;
  const toEmail = env.DOCUMENT_UPLOAD_TO_EMAIL || env.TO_EMAIL || "info@meridianbizsolutions.com";
  const fromEmail = env.DOCUMENT_UPLOAD_FROM_EMAIL || env.FROM_EMAIL || "Meridian Business Solutions <requests@meridianbizsolutions.com>";
  const driveFolderUrl = `https://drive.google.com/drive/folders/${folderId}`;
  const fileListHtml = uploaded.map((file, index) =>
    `<li>${index + 1}. ${escapeHtml(file.name)} (${escapeHtml(formatBytes(file.size))})</li>`
  ).join("");
  const fileListText = uploaded.map((file, index) =>
    `${index + 1}. ${file.name} (${formatBytes(file.size)})`
  ).join("\n");

  const html = `
    <h2>New Website Document Upload</h2>
    <p><strong>Request ID:</strong> ${escapeHtml(requestId)}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
    <p><strong>Service / Request Type:</strong> ${escapeHtml(requestType)}</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Notes:</strong><br>${escapeHtml(notes || "None provided").replace(/\n/g, "<br>")}</p>
    <p><strong>Files uploaded (${uploaded.length}):</strong></p>
    <ul>${fileListHtml}</ul>
    <p><strong>Google Drive folder:</strong><br>
      <a href="${driveFolderUrl}">Open uploaded documents in Google Drive</a>
    </p>
    <p style="font-size:12px;color:#555;">The uploaded documents are stored in Google Drive and are not attached to this email.</p>
  `;

  const text = [
    "Meridian Business Solutions - New Website Document Upload",
    "",
    `Request ID: ${requestId}`,
    `Submitted: ${submittedAt}`,
    `Service / Request Type: ${requestType}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    "Notes:",
    notes || "None provided",
    "",
    `Files uploaded (${uploaded.length}):`,
    fileListText,
    "",
    `Google Drive folder: ${driveFolderUrl}`,
    "",
    "The uploaded documents are stored in Google Drive and are not attached to this email."
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "Meridian-Business-Solutions-Website/1.0",
      "Idempotency-Key": `document-upload-${requestId}`
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `${requestType} Document Upload & requested from Meridian Website`,
      html,
      text
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend notification failed: ${detail || response.status}`);
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInfoText({ requestId, submittedAt, name, email, phone, requestType, notes, uploaded }) {
  const lines = [
    "Meridian Business Solutions",
    "Website Document Submission",
    "",
    `Request ID: ${requestId}`,
    `Submitted (UTC): ${submittedAt}`,
    `Full Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service / Request Type: ${requestType}`,
    "",
    "Notes:",
    notes || "None provided",
    "",
    `Files Submitted (${uploaded.length}):`
  ];
  uploaded.forEach((file, index) => lines.push(`${index + 1}. ${file.name} (${formatBytes(file.size)})`));
  return lines.join("\n") + "\n";
}

function cleanText(value, maxLength) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}
function safeDriveName(value) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 180);
}
function extensionOf(name) {
  const part = String(name || "").split(".").pop();
  return String(part || "").toLowerCase();
}
function mimeFromExtension(ext) {
  return ({
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  })[ext] || "application/octet-stream";
}
function createRequestId() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `MBS-${stamp}-${random}`;
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
