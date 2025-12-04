import { initSearchController } from './controller/searchController.js';
import { initProfileController } from './controller/profileController.js';
import { initReviewsController } from './controller/reviewsController.js';

// Функція Бургер-меню
function initBurgerMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    // Перемикаємо іконку (бутерброд <-> хрестик)
    if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
  });
  
  // Закриваємо меню при кліку на посилання всередині меню
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      }
    });
  });
}

// Головна ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  console.log('Page loaded:', path);

  // 1. Запускаємо бургер-меню (працює на всіх сторінках)
  initBurgerMenu();

  // 2. Логіка для конкретних сторінок
  if (path.endsWith('search.html')) { 
    initSearchController();
  } else if (path.endsWith('profile.html')) {
    initProfileController();
  } else if (path.endsWith('reviews.html')) {
    initReviewsController();
  } else if (path.endsWith('index.html') || path === '/' || path === '') {
    console.log('Home page loaded');
    // Тут можна додати простий виклик слайдера, якщо він буде потрібен пізніше
  } else {
    // Цей лог корисний для відладки, якщо скрипт не бачить сторінку
    console.warn('No controller found for this page path:', path);
  }
});