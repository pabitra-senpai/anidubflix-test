# 🎬 Anidubflix

Anidubflix is a dynamic and responsive anime streaming web application. This project allows users to search for anime, view details, and enjoy episodes through a built-in video player. It also includes PWA (Progressive Web App) support.

---

## 📂 Project Structure

Below is a detailed description of the project's files and folders and their functionalities:

```text
/anidubflix
│
├── index.html              # Homepage (Dynamic slider, trending & latest grid)
├── anime.html              # Anime directory & filtering (Category filter & search page)
├── details.html            # Anime details page (Shows anime banner, poster, and metadata)
├── watch.html              # Video player page (Dynamic video player & episode sidebar)
├── contact.html            # Contact & Anime Request form
├── dmca.html               # DMCA & Copyright policy page
├── privacy.html            # Privacy policy page
├── about.html              # About the developer/site page
│
├── css/
│   ├── style.css           # Global CSS (Glassmorphism, Neon theme, and SVG logo styling)
│   ├── responsive.css      # Responsive design optimization for mobile, tablet, and PC
│   └── player.css          # Styling for the iframe video player and episode grid
│
├── js/
│   ├── main.js             # Core script, data fetch utility, bookmark, and history tracking
│   ├── search.js           # Dynamic live search & category filtering logic
│   ├── player.js           # Dynamic episode selection & iframe rendering logic
│   └── slider.js           # Automatic sliding hero banner logic
│
├── data/
│   ├── anime-index.json    # Lightweight index data file for fast loading on homepage and search
│   └── anime/              # Folder containing complete details and episode data for each anime
│       ├── demon-slayer-s1.json
│       ├── naruto-shippuden-hindi-fan.json
│       └── your-name-movie.json
│
├── manifest.json           # Progressive Web App (PWA) configuration file
└── service-worker.js       # PWA offline cache handler file (updated without data.js)
