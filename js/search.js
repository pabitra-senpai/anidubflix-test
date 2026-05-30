document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `anime.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  const grid = document.getElementById('anime-list-grid');
  if (grid) {
    renderFilteredAnime();
  }
});

async function renderFilteredAnime() {
  const grid = document.getElementById('anime-list-grid');
  if (!grid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search')?.toLowerCase() || "";
  const genreFilter = urlParams.get('genre') || "all";
  const dubFilter = urlParams.get('dub') || "all";

  const animeData = await window.fetchAnimeIndex();

  const filtered = animeData.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery);
    const matchesGenre = genreFilter === "all" || anime.genres.includes(genreFilter);
    const matchesDub = dubFilter === "all" || 
                       (dubFilter === "official" && anime.dubType === "Official Dub") || 
                       (dubFilter === "fan" && anime.dubType === "Fan Dub");

    return matchesSearch && matchesGenre && matchesDub;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">No anime matches found for your filter logic.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(anime => window.createAnimeCard(anime)).join('');
}

window.createAnimeCard = function(anime) {
  const badgeClass = anime.dubType === 'Fan Dub' ? 'badge-fan' : 'badge-official';
  
  // ডাইনামিকালি কার্ডে Series এর বদলে S1 • 26 Eps ফরম্যাট তৈরি করা
  let metaType = anime.type;
  if (anime.type === 'Series' && anime.season) {
    metaType = `S${anime.season} • ${anime.totalEpisodes || '?'} Eps`;
  }
  
  return `
    <div class="anime-card">
      <a href="details.html?id=${anime.id}">
        <div class="card-img-container">
          <span class="card-badge ${badgeClass}">${anime.dubType}</span>
          <span class="card-rating"><i class="fas fa-star"></i> ${anime.rating}</span>
          <img src="${anime.poster}" alt="${anime.title}" loading="lazy">
        </div>
        <div class="card-info">
          <h3>${anime.title}</h3>
          <div class="card-meta">
            <span>${anime.releaseYear}</span>
            <span>${metaType}</span>
          </div>
        </div>
      </a>
    </div>
  `;
}
