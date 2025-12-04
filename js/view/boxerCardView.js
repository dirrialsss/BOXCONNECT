import { showInviteModal } from './modalView.js';

export function renderBoxerCards(boxers) {
  const container = document.getElementById('boxers-container');
  const template = document.getElementById('boxer-card-template');
  container.innerHTML = '';

  boxers.forEach(boxer => {
    const card = template.content.cloneNode(true);

    // Додай дані боксера в DOM
    card.querySelector('.boxer-name').textContent = boxer.name;
    card.querySelector('.boxer-photo-img').src = boxer.photo;
    card.querySelector('.country-flag').src = boxer.flag;

    // Місцезнаходження як посилання на Google Maps
    const locationLink = card.querySelector('.boxer-location');
    locationLink.textContent = `${boxer.city}, ${boxer.country}`;
    locationLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${boxer.city}, ${boxer.country}`)}`;
    locationLink.target = '_blank'; // Відкриває у новій вкладці

    card.querySelector('.boxer-weight').textContent = 'Weight: ' + boxer.weight;
    card.querySelector('.boxer-height').textContent = 'Height: ' + boxer.height;
    card.querySelector('.boxer-age').textContent = 'Age: ' + boxer.age + ' y.o.';
    card.querySelector('.boxer-level').textContent = 'Level: ' + boxer.level;
    card.querySelector('.boxer-stance').textContent = boxer.stance;

    // Додай слухача на кнопку запрошення
    card.querySelector('.invite-button').addEventListener('click', () => {
      showInviteModal();
    });

    container.appendChild(card);
  });
}
