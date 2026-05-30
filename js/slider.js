class HeroSlider {
  constructor() {
    this.slides = [];
    this.currentSlide = 0;
    this.container = document.getElementById('hero-slider');
    this.init();
  }

  async init() {
    if (!this.container) return;
    
    const animeData = await window.fetchAnimeIndex();
    const slidesData = animeData.filter(anime => anime.trending).slice(0, 3);
    
    if (slidesData.length === 0) return;

    this.container.innerHTML = slidesData.map((anime, index) => `
      <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${anime.banner || anime.poster}');">
        <div class="slide-content">
          <span class="slide-tag">${anime.dubType}</span>
          <h2 class="slide-title">${anime.title}</h2>
          <div class="slide-meta">
            <span><i class="fas fa-star"></i> ${anime.rating}</span>
            <span><i class="fas fa-calendar-alt"></i> ${anime.releaseYear}</span>
            <span><i class="fas fa-film"></i> ${anime.type}</span>
          </div>
          <div class="slide-buttons">
            <a href="details.html?id=${anime.id}" class="btn btn-primary"><i class="fas fa-play"></i> Watch Now</a>
          </div>
        </div>
      </div>
    `).join('');

    this.slides = document.querySelectorAll('.slide');
    if (this.slides.length > 1) {
      setInterval(() => this.nextSlide(), 6000);
    }
  }

  nextSlide() {
    this.slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
});
