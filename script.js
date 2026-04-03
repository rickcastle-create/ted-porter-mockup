/* Lightweight interactions: mobile nav + reusable slider logic */

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupSlider(trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const prev = document.querySelector(`.slider-btn--prev[data-target="${trackId}"]`);
  const next = document.querySelector(`.slider-btn--next[data-target="${trackId}"]`);
  const viewport = track.parentElement;
  let index = 0;

  function getStep() {
    const card = track.children[0];
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    return card.getBoundingClientRect().width + gap;
  }

  function getMaxIndex() {
    const step = getStep();
    if (!step) return 0;
    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    return Math.ceil(maxOffset / step);
  }

  function update() {
    const step = getStep();
    track.style.transform = `translateX(${-index * step}px)`;
  }

  prev?.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    update();
  });

  next?.addEventListener('click', () => {
    index = Math.min(getMaxIndex(), index + 1);
    update();
  });

  window.addEventListener('resize', () => {
    index = Math.min(index, getMaxIndex());
    update();
  });
}

setupSlider('category-track');
setupSlider('testimonial-track');
