export function initReviewsController() {
  setupReviewToggle();
  setupSendReview();
  setupRevealAnimations();
}

function setupReviewToggle() {
  document.querySelectorAll('.review-card .toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const reviewText = button.closest('.review-card').querySelector('.review-text');
      const fullText = reviewText.getAttribute('data-full-text');
      const isExpanded = reviewText.classList.contains('expanded');

      if (isExpanded) {
        reviewText.textContent = fullText.length > 150 ? fullText.substring(0, 150) + '...' : fullText;
        reviewText.classList.remove('expanded');
        reviewText.classList.add('truncated');
        button.textContent = 'Show more';
      } else {
        reviewText.textContent = fullText;
        reviewText.classList.remove('truncated');
        reviewText.classList.add('expanded');
        button.textContent = 'Less';
      }
    });
  });
}

function setupSendReview() {
  document.querySelector('.send-btn')?.addEventListener('click', function () {
    const textarea = document.querySelector('.feedback-box textarea');
    this.style.background = '#28a745';
    this.textContent = 'Sent!';
    textarea.value = '';

    setTimeout(() => {
      this.style.background = '#a33636';
      this.textContent = 'Send review';
    }, 2000);
  });
}

function setupRevealAnimations() {
  const cards = document.querySelectorAll('.review-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}
