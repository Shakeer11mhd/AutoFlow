# ⚡ NexaFlow — AI Agents & Automation Company Website

A modern, interactive company website for an AI agents, automation systems, and brand design agency. Built with vanilla HTML/CSS/JS + Three.js 3D animations. Zero dependencies, instant deployment to GitHub Pages.

![NexaFlow Preview](https://img.shields.io/badge/Status-Live-00e5ff?style=flat-square) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-7c3aed?style=flat-square)

---

## 🚀 Deploy to GitHub Pages (5 Minutes)

### Step 1 — Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `nexaflow` (or any name)
3. Set visibility to **Public**
4. Click **Create repository**

### Step 2 — Upload Files

**Option A — GitHub Web UI (no terminal needed)**
1. In your new repo, click **"uploading an existing file"**
2. Drag and drop ALL files/folders from this project
3. Commit message: `Initial commit`
4. Click **Commit changes**

**Option B — Git CLI**
```bash
cd nexaflow
git init
git add .
git commit -m "feat: initial NexaFlow website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nexaflow.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` will auto-trigger
4. Wait ~60 seconds, then visit: `https://YOUR_USERNAME.github.io/nexaflow`

> ✅ That's it! Your site is live.

---

## 📁 Project Structure

```
nexaflow/
├── index.html                    # Main website (single page)
├── css/
│   └── style.css                 # All styles (dark theme, animations)
├── js/
│   └── main.js                   # Three.js 3D, interactions, animations
├── .github/
│   └── workflows/
│       └── deploy.yml            # Auto-deploy to GitHub Pages
└── README.md
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌐 3D Hero | Three.js particle sphere + wireframe torus with mouse tracking |
| 🖱️ Custom Cursor | Magnetic cursor with hover morphing effects |
| 📱 Responsive | Mobile-first, works on all devices |
| 🎞️ Scroll Animations | Intersection Observer reveal with stagger delays |
| 🔢 Counter Animations | Animated stats (240+, 98%, 12x) on scroll |
| 🃏 3D Card Tilt | Mouse-tracking perspective tilt on service & work cards |
| 📜 Infinite Marquee | Auto-scrolling tech/service tag strip |
| 📋 Contact Form | Client-side form with success state |
| ⚡ Zero Build | Pure HTML/CSS/JS — no npm, no bundler needed |

---

## 🎨 Customization

### Change Company Name
Search & replace `NexaFlow` in `index.html`

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --accent: #00e5ff;     /* Primary cyan */
  --accent2: #7c3aed;    /* Purple */
  --accent3: #10b981;    /* Green */
  --bg: #080c14;         /* Dark background */
}
```

### Update Services
Edit the three `.service-card` blocks in `index.html`

### Add Real Form Handling
Replace the form submit handler in `js/main.js` with your preferred service:
- [Formspree](https://formspree.io) — free, easy
- [EmailJS](https://emailjs.com) — client-side email
- [Netlify Forms](https://netlify.com) — if deploying to Netlify

### Connect Real Email (Formspree)
```html
<!-- Replace the form tag in index.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```

---

## 📦 Services Covered

1. **AI Agents** — Custom LLM agents, RAG systems, multi-agent orchestration
2. **Automated Systems** — n8n/Make/Zapier pipelines, CRM automation, data sync
3. **Modern Business & Brand** — Brand identity, Canva kits, websites, pitch decks

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, grid, animations, @keyframes
- **Vanilla JavaScript (ES6+)** — No framework
- **Three.js r128** — 3D particle field + wireframe geometry
- **Google Fonts** — Syne (display) + DM Sans (body)

---

## 📄 License

MIT — free to use, modify, and deploy for commercial projects.

---

*Built with ⚡ by NexaFlow*
