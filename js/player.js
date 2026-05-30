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
  const watchSeasonTabs = document.getElementById('watch-season-tabs');
  const seasonListHeader = document.getElementById('season-list-header');

  const selectedEpisode = anime.episodes.find(e => e.number === epNum) || anime.episodes[0];

  if (watchIframe && selectedEpisode) {
    watchIframe.src = selectedEpisode.embedUrl;
    watchTitle.textContent = anime.title;
    watchEpTitle.textContent = `Episode ${selectedEpisode.number}: ${selectedEpisode.title}`;
    
    saveWatchProgress(anime.id, selectedEpisode.number, anime.title, anime.poster, 100);
  }

  if (epGrid) {
    epGrid.innerHTML = anime.episodes.map(ep => `
      <a href="watch.html?id=${anime.id}&ep=${ep.number}" class="ep-btn ${ep.number === epNum ? 'active' : ''}">
        ${ep.number}
      </a>
    `).join('');
  }

  // watch.html-এ ডাইনামিক সিজন সিলেক্টর রেন্ডার করার লজিক
  try {
    const allAnime = await window.fetchAnimeIndex();
    
    // রুট টাইটেল বা মেইন নাম বের করার হেল্পার ফাংশন
    const getBaseTitle = (t) => {
      return t.replace(/\s*\(Season\s*\d+\)/i, '')
              .replace(/\s*Season\s*\d+/i, '')
              .replace(/\s*S\d+/i, '')
              .trim();
    };

    const baseTitle = getBaseTitle(anime.title);
    
    // একই মেইন নামের সব সিজন ফিল্টার করা
    const relatedSeasons = allAnime.filter(item => {
      return getBaseTitle(item.title) === baseTitle && item.type === 'Series';
    });

    if (relatedSeasons.length > 1 && watchSeasonTabs && seasonListHeader) {
      // সিজনগুলোকে সঠিকভাবে সিকোয়েন্সে সর্ট করা
      relatedSeasons.sort((a, b) => {
        const getSeasonNum = (titleText) => {
          const match = titleText.match(/Season\s*(\d+)/i);
          return match ? parseInt(match[1]) : (parseInt(a.releaseYear) || 0);
        };
        return getSeasonNum(a.title) - getSeasonNum(b.title);
      });

      watchSeasonTabs.innerHTML = relatedSeasons.map(item => {
        const sMatch = item.title.match(/Season\s*(\d+)/i);
        const label = sMatch ? `Season ${sMatch[1]}` : item.title;
        const isActive = item.id === anime.id ? 'active' : '';
        return `
          <a href="watch.html?id=${item.id}&ep=1" class="season-tab-btn ${isActive}">
            ${label}
          </a>
        `;
      }).join('');
      
      watchSeasonTabs.style.display = 'flex';
      seasonListHeader.style.display = 'block';
    }
  } catch (err) {
    console.error("Failed to load seasonal tabs on watch page:", err);
  }
});
