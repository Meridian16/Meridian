# Meridian Business Solutions V5 - Google Drive Document Upload Setup

This package keeps the existing Schedule Service and Partner With Us Cloudflare functions unchanged. The new upload feature uses only:

- `RON.html`
- `js/document-upload.js`
- `functions/api/document-upload.js`
- isolated styles appended to `css/styles.css`

## Google Drive destination

Master folder: `Meridian Website Uploads`

Folder ID already configured as the fallback:

`1_Rp7zDUMzOwXIE-uLMhm-bw1BToDhRK_`

Google Workspace owner: `krishna@meridianbizsolutions.com`

Each submission creates a new child folder using the visitor's **Full Name** exactly as the visible folder name (with control characters/extra whitespace removed). Google Drive allows duplicate visible folder names, so two people with the same name can still create separate folders.

Inside that folder the function stores:

1. Every accepted uploaded document.
2. `request-info.txt` containing the form fields, timestamp, request ID, and uploaded filenames.

## Email notification after a successful upload

After Google Drive confirms that the customer folder, uploaded documents, and `request-info.txt` were stored successfully, the upload Function also sends a notification email through the same **Resend** account already used by Schedule Service and Partner With Us.

Default recipient:

`info@meridianbizsolutions.com`

Subject format:

`{Service / Request Type} Document Upload & requested from Meridian Website`

Example:

`Apostille Document Upload & requested from Meridian Website`

The notification includes the request ID, customer name, email, phone, request type, notes, uploaded filenames, and a direct link to the newly created Google Drive folder. The documents themselves are **not** attached to the email.

The customer's email address is used as **Reply-To**, so replying to the notification from your mailbox addresses the customer.

The Drive upload remains the primary transaction. If Resend has a temporary delivery/API problem after the documents were successfully stored, the Function still returns a successful upload to the customer and logs the notification failure instead of falsely reporting that the documents were lost.

### Email configuration

If Schedule Service and Partner With Us are already sending email successfully, **no new Resend secret is required**. The upload Function reuses:

- `RESEND_API_KEY`
- `TO_EMAIL` when present, otherwise `info@meridianbizsolutions.com`
- `FROM_EMAIL` when present, otherwise `Meridian Business Solutions <requests@meridianbizsolutions.com>`

Optional upload-specific overrides can be added in Cloudflare if desired later:

- `DOCUMENT_UPLOAD_TO_EMAIL`
- `DOCUMENT_UPLOAD_FROM_EMAIL`

## Accepted files / limits

- PDF
- JPG / JPEG
- PNG
- DOC
- DOCX
- Maximum 10 files per submission
- Maximum 10 MB per file
- Maximum 50 MB combined

## One-time Google setup

1. Sign into Google Cloud using the Workspace account that will authorize the Drive access. Use `krishna@meridianbizsolutions.com` for the authorization step.
2. Create or select a Google Cloud project for Meridian Business Solutions.
3. Enable **Google Drive API**.
4. Configure the OAuth consent screen. If your Workspace organization allows it, use an **Internal** app so access is limited to your organization.
5. Create an **OAuth 2.0 Client ID** with application type **Web application**.
6. Add this authorized redirect URI to that OAuth client:

   `https://developers.google.com/oauthplayground`

7. Open Google OAuth 2.0 Playground.
8. In the Playground settings, enable **Use your own OAuth credentials**, then enter the Client ID and Client Secret from step 5. Keep **Access type = Offline**.
9. In Step 1, enter this scope and authorize it while signed in as `krishna@meridianbizsolutions.com`:

   `https://www.googleapis.com/auth/drive`

10. In Step 2, exchange the authorization code for tokens and copy the **Refresh token**.

Do not place the Client Secret or Refresh Token in HTML, JavaScript, Git, or this ZIP.

## Add Cloudflare Pages secrets

In Cloudflare Dashboard:

**Workers & Pages > your Meridian Pages project > Settings > Variables and Secrets**

Add these as encrypted secrets:

- `GOOGLE_CLIENT_ID` = your OAuth client ID
- `GOOGLE_CLIENT_SECRET` = your OAuth client secret
- `GOOGLE_REFRESH_TOKEN` = the refresh token from OAuth Playground

Optional plain environment variable:

- `GOOGLE_DRIVE_PARENT_FOLDER_ID` = `1_Rp7zDUMzOwXIE-uLMhm-bw1BToDhRK_`

The function already uses that folder ID as a fallback, so the optional variable is mainly useful if you later move to a different master folder.

After adding secrets, redeploy the Cloudflare Pages project so the Function receives them.

## Test

1. Open `RON.html` on the deployed website.
2. Select the final card, **Printing Services**.
3. Enter test values and choose one or more permitted files.
4. Click **Upload Documents**.
5. Confirm a new folder appears under `Meridian Website Uploads`.
6. Confirm the uploaded documents and `request-info.txt` are inside it.

## Existing communications preserved

The following existing working files were copied unchanged from the prior stable package:

- `functions/api/service-request.js`
- `functions/api/partner-inquiry.js`

The new upload flow does not call or modify those endpoints.
