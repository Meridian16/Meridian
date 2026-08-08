MERIDIAN BUSINESS SOLUTIONS WEBSITE - REFINED VERSION
====================================================

This folder is ready for upload to a standard IONOS web-hosting account.

UPLOAD
1. Extract the ZIP file.
2. Upload the CONTENTS of this folder to the web root for your domain.
3. Make sure index.html is directly inside the web root.
4. Keep the assets, css, and js folders in the same relative locations.

PAGES
- index.html
- notary.html
- RON.html
- courier.html
- Auto.html
- printing.html
- legal.html and privacy.html are retained as standalone fallback pages.

NEW FEATURES
- Bold Meridian Business Solutions name in the site header.
- Facebook, Instagram, and YouTube icons.
- Reduced service-card height and tighter image-to-title spacing.
- Larger card text and action text.
- Schedule Service buttons on every home-page service card.
- Email-request form addressed to vkreddy@yahoo.com.
- Legal Notice, Privacy Policy, and Contact Us open in large scrolling pop-ups.
- Larger service-detail pop-ups with five bullets each.

IMPORTANT: EMAIL FORM
The current form uses a mailto link. It opens the visitor's installed/default email application with a completed message. The visitor must review the email and press Send. This is the most portable zero-configuration option for a static website.

For direct website submission without opening an email application, replace it later with either:
- an IONOS-hosted PHP form handler, or
- a form service endpoint such as Formspree.

SOCIAL MEDIA LINKS
Edit js/app.js and locate SITE_CONFIG near the top. Replace each # with the dedicated profile URL:

socialLinks: {
  facebook: '#',
  instagram: '#',
  youtube: '#'
}

PLACEHOLDERS TO REPLACE BEFORE LAUNCH
- Business phone number
- Business address
- Service area
- Business hours
- Legal entity information
- Final legal and privacy language

No external fonts, image services, frameworks, or JavaScript libraries are required.


REFINEMENT UPDATE
- Taller service cards and full-fit artwork
- Northern Virginia service-area wording added
- Narrower hamburger menu without arrows
- Darker menu highlighting
- Simplified Schedule Service form with red required-field markers


V3 UPDATES
----------
- Simplified page names: RON.html and Auto.html.
- Schedule Service buttons are available on both the home page and all service-detail cards.
- Service-card artwork uses a taller canvas so illustrations display fully.


V4 UPDATES
----------
- Reduced banner headline size by two additional points across all main pages.
- Increased service-card height and reserved a consistent three-line description area.
- Replaced Power of Attorney with Apostille Support on notary.html.
- Added the supplied NNA certification and membership images below the Notary service cards.
- Replaced Tire & Pressure Checks with Fluid Service on Auto.html.
- Replaced Vehicle Inspections with Emergency Road Service on Auto.html.
- Added Partner With Us to every main-page footer with a matching request popup.
- Updated the Schedule Service popup subtitle.

The Schedule Service and Partner With Us forms still use the visitor's email application until a direct form-to-email backend is connected.

CUSTOM 404 PAGE
---------------
The package includes 404.html and an .htaccess rule that displays it when a visitor opens a missing URL. The page automatically redirects visitors to https://meridianbizsolutions.com/ after five seconds and also includes a manual Home Page button.

Important: Upload the hidden .htaccess file along with the other website files. Some file managers hide filenames that begin with a period, so enable "show hidden files" if needed.
