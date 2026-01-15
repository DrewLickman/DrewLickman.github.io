# Drew Lickman — Portfolio Website

Live site: `https://drewlickman.github.io/`

A responsive, single-page portfolio site focused on **IT Specialist / tech support**—with projects, experience, and a recruiter-friendly contact flow.

## Features

- **Responsive single-page layout** (anchor nav + smooth scrolling)
- **Light/Dark mode toggle**
- **Projects**
  - Category filters
  - Clickable project cards with a **details modal** (problem/solution/impact/stack/links)
- **Experience & Education**
  - Compact 2–3 line summaries
  - Click to open a **details modal** with the full entry text
- **Contact**
  - Quick-action buttons (Email / IT Resume / LinkedIn / GitHub)
  - Message form with **Copy / Gmail / Outlook / Mail app** actions (works even without a configured desktop mail client)
- **Lightweight click metrics** (privacy-friendly, stored locally in `localStorage`)
  - View totals in DevTools via `window.DL_metrics()`

## Tech stack

- HTML + CSS (custom styling + generated Tailwind utilities)
- Vanilla JavaScript
- TailwindCSS (builds to `css/tailwind.generated.css`)

## Repo layout

- `index.html`: page content/structure
- `css/styles.css`: main styles
- `css/tailwind.css` / `css/tailwind.generated.css`: Tailwind input/output
- `js/main.js`: interactive behavior (theme toggle, filters, modals, contact actions, click metrics)
- `Assets/`: images and thumbnails
- `Resumes/`: PDF + HTML resume versions

## Local development

You can open `index.html` directly in a browser.

If you want to rebuild Tailwind output:

```bash
npm install
npm run build:tailwind
```

## Updating click metrics

- Metrics are stored in the browser (no network requests).
- In DevTools Console, run:

```js
window.DL_metrics()
```

To reset:

```js
localStorage.removeItem('dl_site_metrics_v1')
```

## Deployment

This repo is intended for GitHub Pages. Pushing to `main` updates `origin/main`, and GitHub Pages serves the site at `https://drewlickman.github.io/`.

## Contact

- Email: `contact.drew.business@gmail.com`
- LinkedIn: `https://linkedin.com/in/drew-lickman`
- GitHub: `https://github.com/DrewLickman`

## License

No license file is currently included in this repository. If you want an explicit license (MIT/ISC/etc.), add a `LICENSE` file and update this section.
