import { setupCountryCityFilter } from './filters/countryCity.js';
import { setupWeightFilter } from './filters/weight.js';
import { loadBoxerCards } from './results/loadBoxers.js';
import { setupSearchScroll } from './results/scroll.js';
import { setupModal } from './modal/inviteModal.js';

document.addEventListener('DOMContentLoaded', () => {
    setupCountryCityFilter();
    setupWeightFilter();
    loadBoxerCards();
    setupSearchScroll();
    setupModal();
});