# 🎬 Anidubflix

Anidubflix is a dynamic, lightweight, and responsive anime streaming web application. It features a complete modular data structure, high-quality PNG-style SVG branding, local bookmarking, history progress tracking, and Progressive Web App (PWA) offline support.

---

## 🚀 Live Demo & Tools

* **Live Website:** [https://pabitra-senpai.github.io/anidubflix-test/](https://pabitra-senpai.github.io/anidubflix-test/)
* **Dynamic JSON Compiler Tool (Admin):** [https://pabitra-senpai.github.io/anidubflix-test/compiler.html](https://pabitra-senpai.github.io/anidubflix-test/compiler.html) *(Save our HTML Compiler code as `compiler.html` at your root to access this)*

---

## ✨ Features

- **Modular "Easy-Setup" Database:** No heavy hardcoded database loading. Pages dynamically load metadata indexes and individual anime details only when required.
- **Hacker Termux-Style JSON Compiler:** A fully-featured developer utility with 5 distinct retro themes (Classic Termux, Matrix Cyan, Fallout Amber, Dracula, and MS-DOS Blue) to effortlessly generate compatible JSON schemas.
- **PNG-Style SVG Logo:** Crisp, high-definition vector logo built inline to prevent resolution drop across 4K displays and mobile screen ratios.
- **Progressive Web App (PWA):** Built-in support for offline page caching and add-to-home-screen options on Android, iOS, and PC.
- **No Self-Hosted Media:** Avoids hosting-takedown issues or bandwidth caps by sourcing streams safely via external platforms (YouTube, Catbox, Streamtape, Pixeldrain, etc.).
- **Local Progress & Bookmarks:** Tracking for "Continue Watching" and user bookmarks processed locally on client-side browser storage (LocalStorage).

---

## 📂 Project Structure

```text
/anidubflix
│
├── index.html              # Homepage (Dynamic slider, trending & latest releases grid)
├── anime.html              # Anime directory & filtering (Category filter & live search page)
├── details.html            # Anime details page (Fetches individual anime JSON data dynamically)
├── watch.html              # Video player page (Fetches details & renders episode sidebar grid)
├── contact.html            # Contact & Anime Request form
├── dmca.html               # DMCA & Copyright policy page
├── privacy.html            # Privacy policy page
├── about.html              # About the developer/site page
├── compiler.html           # Termux/Hacker-style dynamic JSON compiler utility tool
│
├── css/
│   ├── style.css           # Global CSS (Glassmorphism, Neon theme, and SVG logo styling)
│   ├── responsive.css      # Responsive design layout adaptations for mobile, tablet, and PC
│   └── player.css          # Core styles for the watch iframe player and episodes sidebar
│
├── js/
│   ├── main.js             # Core script, dynamic index fetch utilities, bookmark, and history tracking
│   ├── search.js           # Live Search and filter query execution logic
│   ├── player.js           # Dynamic episode selection & watch session history updater
│   └── slider.js           # Automatic sliding hero banner logic
│
├── data/
│   ├── anime-index.json    # Lightweight indexing file for fast homepages, sliders & searches
│   └── anime/              # Modular folder containing complete details and episode data for each anime
│       ├── demon-slayer-s1.json
│       ├── naruto-shippuden-hindi-fan.json
│       └── your-name-movie.json
│
├── manifest.json           # Progressive Web App (PWA) configuration file
└── service-worker.js       # PWA offline asset pre-caching handler (updated without static data.js)
