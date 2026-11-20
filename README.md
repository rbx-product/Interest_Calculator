# Accrue – Simple & Compound Interest Calculator

React + Vite, fully client-side. No backend, API keys or paid services. Chart is dependency-free SVG.

## Run
```
npm install
npm run dev      # local dev
npm test         # calculation tests
npm run build    # outputs dist/
```

## Deploy to Netlify
1. Push this folder to GitHub, then in Netlify choose **Add new site → Import from Git**.
2. Build command `npm run build`, publish directory `dist` (already in `netlify.toml`).
3. Pages use hash routing (`#/about`), so no redirect rules are needed.
4. Or drag the built `dist/` folder onto Netlify Drop.

## Before launch
- Replace `YOUR-DOMAIN.netlify.app` in `index.html`, `public/robots.txt`, `public/sitemap.xml`.
- Set `contactEmail` in `src/config.js`; review the Privacy, Terms and Disclaimer drafts in `src/components/Pages.jsx`.
- Submit the sitemap in Google Search Console.

## AdSense
No ad code is included. `.adslot` in `App.jsx` is blank spacing for a future unit. Add your AdSense script to `index.html` only when you have it, and update the Privacy Policy.

## Structure
`src/lib/calc.js` (formulas, validation, formatting) · `src/components/` (Calculator, Chart, Content, Pages) · `src/styles.css`
