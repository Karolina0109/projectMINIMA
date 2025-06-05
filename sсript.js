function initProductsCarousel() {
  const carousel = document.querySelector('.products-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const cards = track.querySelectorAll('.product-card');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let currentIndex = 0;
  let cardWidth = 0;
  let maxIndex = 0;

  function updateParams() {
    if (cards.length > 0) {
      const style = getComputedStyle(cards[0]);
      cardWidth = cards[0].offsetWidth + parseInt(style.marginRight || 0);
    }

    const containerWidth = carousel.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    maxIndex = Math.max(0, cards.length - visibleCards);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
  }

  function moveCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      moveCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      moveCarousel();
    }
  });

  window.addEventListener('resize', () => {
    updateParams();
    moveCarousel();
  });

  updateParams();
  moveCarousel();
}

document.addEventListener('DOMContentLoaded', initProductsCarousel);
