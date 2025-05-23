// script.js
// Виділяємо активне посилання при кліку з підкреслненням
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
