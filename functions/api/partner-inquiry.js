// Cloudflare Pages Function
// Route: POST /api/partner-inquiry
// Sends the submitted form data as an email via the Resend API.
//
// Required environment variable (set in Cloudflare Pages dashboard):
//   RESEND_API_KEY   -> your Resend API key (kept secret, never exposed to the browser)
//
// Optional environment variables:
//   TO_EMAIL          -> defaults to info@meridianbizsolutions.com
//   FROM_EMAIL         -> defaults to Partner Inquiries <partners@meridianbizsolutions.com>
//                          (must be an address on a domain verified in Resend)

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const { website, fullName, companyName, email, phone, message } = body || {};

  // Honeypot: if this hidden field is filled in, silently pretend success (it's a bot)
  if (website) {
    return jsonResponse({ ok: true });
  }

  // Basic server-side validation
  if (!fullName || !companyName || !email || !message) {
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
  const fromEmail = env.FROM_EMAIL || "Partner Inquiries <partners@meridianbizsolutions.com>";

  const escapeHtml = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const html = `
    <h2>New Partner Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
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
        subject: `New Partner Inquiry — ${companyName}`,
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