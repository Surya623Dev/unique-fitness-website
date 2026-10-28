# Unique Fitness — Production-ready static website foundation

Dark cinematic bodybuilding / strength-training website for **Unique Fitness**, with black and gunmetal surfaces, electric-lime accents and sample photography.

## Files
- index.html — homepage and Netlify-enabled enquiry form
- styles.css — responsive UI, layout, motion, focus states and reduced-motion support
- script.js — responsive menu, section highlighting, program selector and form-host checks
- site-config.js — contact details and public branding settings
- thank-you.html — post-enquiry confirmation page
- privacy.html — starter privacy notice (review and verify before launch)
- favicon.svg — brand favicon
- netlify.toml — static publish settings and security headers
- .github/workflows/pages.yml — GitHub Pages deployment workflow
- visual-concept.svg — brand-direction reference

## Local preview
Open index.html in a browser. External sample photos and Google Fonts require an internet connection. Some form behavior depends on deployment hosting.

## Recommended production deployment: Netlify
The contact form is configured for Netlify Forms.
1. Import this GitHub repository into Netlify.
2. Use the repository root as the publish directory; the included netlify.toml already sets this.
3. Deploy the site. Netlify should detect the form named trial-enquiry.
4. In Netlify site settings, enable form handling if prompted and configure email notifications or your preferred follow-up workflow.
5. Submit a test enquiry and confirm it appears in Netlify Forms before launching publicly.

GitHub Pages can host the static site. To use the included workflow, open repository **Settings → Pages** and set the source to **GitHub Actions**; the workflow then deploys on pushes to `main`. GitHub Pages does not process HTML form submissions; use Netlify (recommended) or configure another form/API provider before collecting leads.

## Before public launch
- Replace sample gym and trainer photography with licensed/owned photos when ready.
- Edit site-config.js with verified phone number, WhatsApp number, email, address, hours and social URLs.
- Confirm services, access claims, coaching availability, membership inclusions, pricing and terms. The page avoids fixed prices because they have not been provided.
- Review the privacy notice to match real processing, retention, data access and contact practices.
- Configure form notifications and test delivery on the production domain.
- Replace the illustrative open graph image if desired and configure a final domain/canonical URL once known.

## Form configuration
The form uses Netlify's native static HTML form processing, a honeypot field and browser validation. It submits to `/thank-you` when hosted on Netlify, which serves the `thank-you.html` confirmation page. On GitHub Pages or a local file preview, the site explains that form processing is not available instead of falsely reporting a successful submission.

## Styling
- Obsidian: #090A09
- Electric lime: #B7FF35
- Gunmetal: #202220
- Titanium white: #F1F2EC
