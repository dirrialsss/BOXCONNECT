function toggleReview(button) {
      const reviewText = button.parentElement.parentElement.querySelector('.review-text');
      const fullText = reviewText.getAttribute('data-full-text');
      const isExpanded = reviewText.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse
        reviewText.textContent = fullText.length > 150 ? fullText.substring(0, 150) + '...' : fullText;
        reviewText.classList.remove('expanded');
        reviewText.classList.add('truncated');
        button.textContent = 'Show more';
      } else {
        // Expand
        reviewText.textContent = fullText;
        reviewText.classList.remove('truncated');
        reviewText.classList.add('expanded');
        button.textContent = 'Less';
      }
    }

    // Send review functionality
    document.querySelector('.send-btn').addEventListener('click', function() {
      const textarea = document.querySelector('.feedback-box textarea');
      const reviewText = textarea.value.trim();
      // Simple success animation
      this.style.background = '#28a745';
      this.textContent = 'Sent!';
      textarea.value = '';
      
      setTimeout(() => {
        this.style.background = '#a33636';
        this.textContent = 'Send review';
      }, 2000);
    });

    // Add smooth scrolling animation
    document.addEventListener('DOMContentLoaded', function() {
      const reviewCards = document.querySelectorAll('.review-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      });
      
      reviewCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
      });
    });