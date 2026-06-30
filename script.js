const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const track = document.getElementById('clientTrack');
const slides = Array.from(track?.children || []);
const dots = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.getElementById('prevClient');
const nextBtn = document.getElementById('nextClient');
const carousel = document.querySelector('.clients-carousel');

let currentSlide = 0;
let autoPlay;

function updateCarousel(index) {
  if (!track || !slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

function startAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    updateCarousel(currentSlide + 1);
  }, 6000);
}

if (slides.length && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    updateCarousel(currentSlide - 1);
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    updateCarousel(currentSlide + 1);
    startAutoPlay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
      startAutoPlay();
    });
  });

  updateCarousel(0);
  startAutoPlay();

  carousel?.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carousel?.addEventListener('mouseleave', startAutoPlay);
}
