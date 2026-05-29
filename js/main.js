// Dynamic Data Fetch Utilities
window.fetchAnimeIndex = async function() {
  try {
    const response = await fetch('data/anime-index.json');
    if (!response.ok) throw new Error('Failed to load anime index');
    return await response.json();
  } catch (error) {
    console.error('Error fetching anime index:', error);
    return [];
  }
};

window.fetchAnimeDetails = async function(id) {
  try {
    const response = await fetch(`data/anime/${id}.json`);
    if (!response.ok) throw new Error('Failed to load anime details');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error);
    return null;
  }
};

// Global State & UI Components Init
document.addEventListener('DOMContentLoaded', () => {
  // Hide Loading animation
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 500);
  }

  // Mobile Menu Interaction
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Active Nav Link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  loadContinueWatching();
  setupBookmarkSystem();
});

// Load Continue Watching Progress
function loadContinueWatching() {
  const cwGrid = document.getElementById('cw-grid');
  if (!cwGrid) return;

  const history = JSON.parse(localStorage.getItem('anidubflix_history')) || [];
  if (history.length === 0) {
    const section = document.getElementById('continue-watching-section');
    if (section) section.style.display = 'none';
    return;
  }

  cwGrid.innerHTML = history.slice(0, 4).map(item => `
    <div class="cw-card">
      <a href="watch.html?id=${item.id}&ep=${item.episode}">
        <div class="cw-thumbnail">
          <img src="${item.poster}" alt="${item.title}" loading="lazy">
          <div class="cw-progress-bar" style="width: ${item.progress || '100'}%"></div>
        </div>
        <div class="cw-info">
          <div class="cw-title">${item.title}</div>
          <div class="cw-ep">Episode ${item.episode}</div>
        </div>
      </a>
    </div>
  `).join('');
}

// Track/Save Video History Progress
window.saveWatchProgress = function(id, episode, title, poster, progress) {
  let history = JSON.parse(localStorage.getItem('anidubflix_history')) || [];
  history = history.filter(item => item.id !== id);
  history.unshift({ id, episode, title, poster, progress });
  localStorage.setItem('anidubflix_history', JSON.stringify(history));
}

// Global Bookmark System
function setupBookmarkSystem() {
  window.toggleBookmark = function(id) {
    let bookmarks = JSON.parse(localStorage.getItem('anidubflix_bookmarks')) || [];
    if (bookmarks.includes(id)) {
      bookmarks = bookmarks.filter(bId => bId !== id);
    } else {
      bookmarks.push(id);
    }
    localStorage.setItem('anidubflix_bookmarks', JSON.stringify(bookmarks));
    updateBookmarkButtonUI(id);
  };
}

window.updateBookmarkButtonUI = function(id) {
  const btn = document.getElementById('bookmark-btn');
  if (!btn) return;
  const bookmarks = JSON.parse(localStorage.getItem('anidubflix_bookmarks')) || [];
  if (bookmarks.includes(id)) {
    btn.innerHTML = '<i class="fas fa-heart"></i> Bookmarked';
    btn.style.background = 'var(--accent-color)';
  } else {
    btn.innerHTML = '<i class="far fa-heart"></i> Bookmark';
    btn.style.background = 'var(--glass)';
  }
}
