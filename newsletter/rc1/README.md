# AstroIndexer 1.0 RC1 Newsletter

Standalone hosted newsletter for the Release Candidate 1 announcement. This is a
point-in-time marketing artifact and is intentionally **not** wired into the main
site navigation.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Hosted "full announcement" web page (self-contained, dark brand). Also the email's **View in browser** target and the `Read the full RC1 announcement` link. |
| `email.html` | The HTML email that gets sent to license holders. Table-based, inline CSS, hosted images, Outlook VML buttons, `<102 KB`. |
| `email.txt` | Plain-text fallback (the `multipart/alternative` companion the SMTP path sends alongside the HTML). |
| `img/` | Optimized, hosted screenshots. Loaded over HTTPS by the email; they do **not** count against Gmail's ~102 KB clip limit. |

## Hosted URLs (after deploy)

- Page: `https://astroindexer.com/newsletter/rc1/`
- Images: `https://astroindexer.com/newsletter/rc1/img/{gallery,platesolver,loupe,backfocus,mobile}.jpg`

The email references those **absolute** image URLs, so the site must be deployed
(images live) **before** the broadcast is sent, or recipients see broken images.

## Sending via the License Manager

The email ships through the License Manager broadcast tool's **"Send designed HTML"**
mode (implemented 2026-07-01; see below). Key points for that path:

- **Subject:** `AstroIndexer 1.0 Release Candidate 1 is here`
- **Personalization:** both `email.html` and `email.txt` contain the `{first_name}`
  token. The send path must run `broadcast_recipients.render_body(...)` on the HTML
  (and the text) **before** handing it to `EmailClient.send_reply(...)`, exactly as
  the Markdown path already does.
- **Transport:** `EmailClient.send_reply(to, subject, body=<email.txt>, html_body=<email.html>)`
  already produces the correct `multipart/alternative` message. No transport change
  is needed - only the composer.
- **Images are hosted, never attached.**

### Composer change (IMPLEMENTED 2026-07-01)

The License Manager broadcast dialog now has a **"Send designed HTML"** mode
(`src/license_generator/broadcast_dialog.py` v1.2.0 + new pure `broadcast_message.py`,
covered by `test_broadcast_message.py`):

1. In the broadcast dialog, click **"Load designed HTML..."** and pick `email.html`.
   A sibling `email.txt` (same folder + stem) is auto-loaded as the editable plain-text
   fallback.
2. Pick recipients, set the subject, and Send. `{first_name}` is substituted per recipient
   in BOTH the HTML and the text fallback; the HTML is sent verbatim (no markdown escaping)
   as the `multipart/alternative` rich part.
3. **"Use Markdown"** switches back to the default Markdown composer.

The `_SendWorker` threading contract is unchanged - it still only calls the pure
`build_broadcast_message` helper + `EmailClient.send_reply`.

## Regenerating the images

Source screenshots live in the app repo at
`Astroindexer/marketing_website/RC1_newsletter/`. Optimized with macOS `sips`:

```bash
sips -s format jpeg -s formatOptions 82 --resampleWidth 1920 "<gallery src>"     --out img/gallery.jpg
sips -s format jpeg -s formatOptions 82 --resampleWidth 1500 "<platesolver src>" --out img/platesolver.jpg
sips -s format jpeg -s formatOptions 82 --resampleWidth 1500 "<loupe src>"       --out img/loupe.jpg
sips -s format jpeg -s formatOptions 82 --resampleWidth 1500 "<backfocus src>"   --out img/backfocus.jpg
sips -s format jpeg -s formatOptions 85 --resampleWidth 720  "<mobile src>"      --out img/mobile.jpg
```

## Notes to confirm before sending

- **App Store link** points to `id6772704017`. The mobile section says "iOS - live now on
  the App Store" (iOS only, per owner).
- **18.6% vs ASTAP** is published as-is per your confirmation.
- **Stacking** copy names both engines - PixInsight AutoIntegrate and Siril via
  AstroIndexer workflow scripts - across OSC / broadband / narrowband.
- **Image Overlay Export** is a full row on the page but folded into "Also new" in the
  email (its screenshot has several "Object not processed" placeholder cards). Swap for a
  fuller capture if you want it promoted to an email row.
- **Feature rows** (page): PlateSolver, Inspect Loupe, Stacking, Object Detector, Image
  Overlay Export, Backfocus, Mobile. **Email rows:** Gallery (hero), PlateSolver, Stacking,
  Object Detector, Backfocus, Mobile.

## Local review

Open `index.html` directly - relative image paths work over `file://`. For the email, open
`email.preview.html` (a throwaway copy with local image paths). **`email.preview.html` is
preview-only - do NOT deploy it;** the real artifact is `email.html`, which uses absolute
`astroindexer.com` image URLs.
