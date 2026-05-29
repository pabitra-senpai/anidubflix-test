document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id');
  const epNum = parseInt(urlParams.get('ep')) || 1;

  if (!animeId) return;

  const anime = await window.fetchAnimeDetails(animeId);
  if (!anime) return;

  const watchIframe = document.getElementById('watch-iframe');
  const watchTitle = document.getElementById('watch-title');
  const watchEpTitle = document.getElementById('watch-ep-title');
  const epGrid = document.getElementById('ep-grid-list');
  const downloadBtn = document.getElementById('download-btn');

  const selectedEpisode = anime.episodes.find(e => e.number === epNum) || anime.episodes[0];

  if (watchIframe && selectedEpisode) {
    watchIframe.src = selectedEpisode.embedUrl;
    watchTitle.textContent = anime.title;
    watchEpTitle.textContent = `Episode ${selectedEpisode.number}: ${selectedEpisode.title}`;
    
    if (downloadBtn) {
      downloadBtn.href = selectedEpisode.downloadUrl;
    }

    saveWatchProgress(anime.id, selectedEpisode.number, anime.title, anime.poster, 100);
  }

  if (epGrid) {
    epGrid.innerHTML = anime.episodes.map(ep => `
      <a href="watch.html?id=${anime.id}&ep=${ep.number}" class="ep-btn ${ep.number === epNum ? 'active' : ''}">
        ${ep.number}
      </a>
    `).join('');
  }
});
