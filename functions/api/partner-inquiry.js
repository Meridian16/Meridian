// Cloudflare Pages Function
// Route: POST /api/partner-inquiry
// Sends a "Partner With Us" form submission as an email via the Resend API.
//
// Required environment variable (already set in Cloudflare Pages):
//   RESEND_API_KEY
//
// Optional environment variables:
//   TO_EMAIL     -> defaults to info@meridianbizsolutions.com
//   FROM_EMAIL   -> defaults to Meridian Business Solutions <requests@meridianbizsolutions.com>

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const { website, name, email, phone, details } = body || {};

  // Honeypot: if this hidden field is filled in, silently pretend success (it's a bot)
  if (website) {
    return jsonResponse({ ok: true });
  }

  // Basic server-side validation
  if (!name || !email || !details) {
    return jsonResponse({ error: "Please fill in all required fields." }, 400);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "Email service is not configured." }, 500);
  }

  const toEmail = env.TO_EMAIL || "info@meridianbizsolutions.com";
  const fromEmail = env.FROM_EMAIL || "Meridian Business Solutions <requests@meridianbizsolutions.com>";

  const escapeHtml = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const html = `
    <h2>New Partnership Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Details:</strong></p>
    <p>${escapeHtml(details).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Partnership: Inquiry`,
        html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API error:", errText);
      return jsonResponse({ error: "Failed to send email. Please try again shortly." }, 502);
    }

    return jsonResponse({ ok: true });

  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return jsonResponse({ error: "Failed to send email. Please try again shortly." }, 500);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
