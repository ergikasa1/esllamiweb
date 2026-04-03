// -------------------------------
// CAROUSEL LOGIC
// -------------------------------
const track = document.getElementById('carouselTrack');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dotsContainer = document.getElementById('carouselDots');
let currentIndex = 0;
let autoInterval;

function createDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (idx === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;
  currentIndex = index;
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, i) => {
    if (i === currentIndex) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function nextSlide() {
  goToSlide((currentIndex + 1) % slides.length);
}

function startAutoPlay() {
  if (autoInterval) clearInterval(autoInterval);
  autoInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  if (autoInterval) clearInterval(autoInterval);
}

// Initialize carousel
createDots();
goToSlide(0);
startAutoPlay();

const carouselContainer = document.querySelector('.carousel');
carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

// -------------------------------
// STICKY BAR (scroll effect)
// -------------------------------
const stickyBar = document.getElementById('stickyBar');
let ticking = false;

function handleStickyOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY > 260) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', handleStickyOnScroll);
handleStickyOnScroll(); // initial check

// -------------------------------
// MODAL LOGIC (shared for all buttons + logo)
// -------------------------------
const modalBackdrop = document.getElementById('modalBackdrop');
const openModalBtn = document.getElementById('openModalBtn');
const liveStreamModalBtn = document.getElementById('liveStreamModalBtn');
const stickyBtn = document.getElementById('stickyBtn');
const logoModalBtn = document.getElementById('logoModalBtn');
const closeModalBtn = document.getElementById('closeModal');

function openModal() {
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// All buttons + logo trigger the same access modal
if (openModalBtn) openModalBtn.addEventListener('click', openModal);
if (liveStreamModalBtn) liveStreamModalBtn.addEventListener('click', openModal);
if (stickyBtn) stickyBtn.addEventListener('click', openModal);
if (logoModalBtn) logoModalBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking backdrop
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
    closeModal();
  }
});

console.log('Profile ready — access modal works for buttons and logo');