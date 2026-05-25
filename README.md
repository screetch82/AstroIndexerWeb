# AstroIndexer Website - Multi-Language Support

This is the official website for AstroIndexer with automatic language detection and support for English and German.

## Features

### 🌍 Automatic Language Detection
The website automatically detects the user's preferred language based on:
1. **Saved preference** (localStorage)
2. **URL parameter** (?lang=de or ?lang=en)
3. **Browser language settings**
4. **Timezone/location** (fallback detection for German-speaking countries)

### 🔄 Language Switcher
- Clean dropdown UI in the navigation bar
- Instant language switching without page reload
- Saves user preference for future visits
- Visual indicators for current language

### 📱 Responsive Design
- Mobile-friendly layout
- Adaptive navigation menu
- Optimized for all screen sizes

## Supported Languages

- **English** (en) - Default
- **German** (de)

## Files Structure

```
website/
├── index.html              # Main HTML file with data-i18n attributes
├── css/
│   ├── style.css          # Main styles
│   └── language-switcher.css  # Language switcher styles
├── js/
│   └── languages.js       # Translation system and language detection
└── images/               # Website images and assets
```

## How It Works

### 1. Language Detection Priority
1. Check localStorage for saved preference
2. Check URL parameter (?lang=)
3. Detect from browser language (navigator.language)
4. Check browser languages array
5. Detect from timezone (for German-speaking regions)

### 2. Adding Translations
All translations are stored in `js/languages.js`. To add new text:

```javascript
translations.en.newSection = {
    title: "English Title",
    description: "English description"
};

translations.de.newSection = {
    title: "Deutscher Titel",
    description: "Deutsche Beschreibung"
};
```

### 3. Using Translations in HTML
Add the `data-i18n` attribute to any element:

```html
<h1 data-i18n="hero.title">Default Text</h1>
<p data-i18n="hero.description">Default description</p>
```

## Deployment to GitHub Pages

1. **Create/Update the repository** `astroindexerweb`
2. **Copy all files** from the website folder
3. **Enable GitHub Pages** in repository settings
4. **Custom domain** (if using astroindexer.com):
   - Add CNAME file with `astroindexer.com`
   - Configure DNS settings

## Contact Form Backend

The contact modal in `index.html` posts to:

```text
https://api.astroindexer.com/api/contact
```

If `api.astroindexer.com` is not yet available, the modal falls back to:

```text
https://astro-indexer-web.vercel.app/api/contact
```

The endpoint is implemented as a Node serverless function in `api/contact.mjs` and
sends mail through the existing Private Email SMTP account. The website can stay
on GitHub Pages; deploy only the API function to a Node serverless host such as
Vercel, then point `api.astroindexer.com` at that deployment.

Vercel DNS record:

```text
A api.astroindexer.com 76.76.21.21
```

Required production environment variables:

```text
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_USER=support@astroindexer.com
SMTP_PASS=<set as a secret, never commit this>
CONTACT_TO=support@astroindexer.com
CONTACT_FROM=AstroIndexer Website <support@astroindexer.com>
ALLOWED_ORIGINS=https://astroindexer.com,https://www.astroindexer.com,https://screetch82.github.io
```

Local syntax check:

```bash
npm install
npm run check:contact-api
```

The form includes server-side validation, CORS allowlisting, and a hidden
honeypot field. For heavier spam protection, add Cloudflare Turnstile or another
captcha before calling the API.

## Important Notes

### Download Links
Both download buttons in the HTML need to be updated with the actual Google Drive link:
- Replace `https://drive.google.com/your-download-link` with your actual download URL
- The "Download AstroIndexer v19.6" button now points to the same Google Drive location

### Language-Specific URLs
The system maintains clean URLs and adds language parameter only when needed:
- Default: `astroindexer.com`
- German: `astroindexer.com?lang=de`
- English (explicit): `astroindexer.com?lang=en`

### SEO Considerations
- HTML `lang` attribute updates automatically
- Meta descriptions change based on language
- Open Graph tags update for social sharing

## Testing Locally

1. Open `index.html` in a web browser
2. Test language switching:
   - Click the language switcher
   - Add `?lang=de` to the URL
   - Change browser language settings
3. Check localStorage persistence
4. Test responsive design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Future Enhancements

- [ ] Add more languages (French, Spanish, Italian)
- [ ] Implement IP-based geolocation as additional detection method
- [ ] Add language-specific URLs (/en/, /de/)
- [ ] Implement hreflang tags for better SEO
- [ ] Add RTL language support

## License

© 2024 AstroIndexer. All rights reserved.
