# Rockstar Auto Repair - website

Static multi-page site (Cloudflare Pages/Workers, `assets.directory: "."`).

## Structure

Every nav item is now a real, independently-crawlable page (own folder +
`index.html`, own `<title>`/description/canonical/OG/Twitter tags, own
JSON-LD). There is no more client-side tab routing - `script.js` now only
handles the services-dropdown UX and the two contact forms.

## Before deploying

1. **Copy your `images/` folder back in** (BoostXS.jpg, Building_Jeep.jpg,
   Car_Work.jpg, Hoods_Up_Shop.jpg, Mech.jpg, etc.) - it wasn't part of this
   upload/rebuild, so this delivery does not include your real shop photos.
   `favicon.png` and `og-image.jpg` ARE included here as plain placeholders
   (brand colors, no photo) since the old site referenced both but neither
   existed anywhere - swap them for real ones whenever you have them.
2. **Deploy `worker.js` as its own Worker** (e.g. `rockstar-api`), routed at
   `api.rockstarautorepair.com`, with these secrets set via
   `wrangler secret put <NAME> --name rockstar-api`:
   - `RESEND_API_KEY`
   - `DESTINATION` (e.g. `service@rockstarautorepair.com`)
   - `FROM_ADDRESS` (must be on a domain verified in Resend)
   - `ALLOWED_ORIGIN` (`https://rockstarautorepair.icestreams.io` while
     staging, then `https://rockstarautorepair.com` at launch)
   This is the exact same technical pattern icestreams.io's contact form
   uses - only the fields changed. Until this Worker is deployed, both
   forms will show a network-error status when submitted.
3. Once the production domain is live, the canonical/OG URLs in every page
   already point to `https://rockstarautorepair.com` - no find/replace
   needed at launch.
