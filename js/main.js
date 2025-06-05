import { initSearchController } from './controller/searchController.js';
import { initProfileController } from './controller/profileController.js';
import { initReviewsController } from './controller/reviewsController.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.endsWith('search.html')) {
    initSearchController();
  } else if (path.endsWith('profile.html')) {
    initProfileController();
  } else if (path.endsWith('reviews.html')) {
    initReviewsController();
  } else if (path.endsWith('index.html') || path === '/' || path === '') {
    console.log('Home page loaded');
    // initHomeController(); // якщо буде окрема логіка для index.html
  } else {
    console.warn('No controller found for this page');
  }
});
