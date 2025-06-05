import { fetchBoxers } from './js/model/boxersModel.js';
import { fetchLocations } from './js/model/locationsModel.js';
import { fetchWeights } from './js/model/weightsModel.js';
import { Observable } from './js/model/observer.js';

import {
  populateCountryFilter,
  populateCityFilter,
  populateWeightFilter
} from './js/view/filtersView.js';

import { renderBoxerCards } from './js/view/boxerCardView.js';
import { setupInviteModal } from './js/view/modalView.js';

import { CombinedFilter } from './js/controller/strategy.js';

const filtersChanged = new Observable();

let currentFilters = {
  country: '',
  city: '',
  weight: '',
  gender: ''
};

let boxers = [];
let locations = {};
let weights = {};

export async function initSearchController() {
  boxers = await fetchBoxers();
  locations = (await fetchLocations()).countries;
  weights = await fetchWeights();

  populateCountryFilter(locations);
  renderBoxerCards(boxers);

  setupFilterListeners();
  setupFilterSubscribers();
  setupInviteModal();
  setupSearchButtonListener();
}

function setupFilterListeners() {
  const countrySelect = document.getElementById('country');
  const citySelect = document.getElementById('city');
  const weightSelect = document.getElementById('weight');
  const genderSelect = document.getElementById('gender');

  countrySelect.addEventListener('change', () => {
    const selectedCountry = countrySelect.value;
    currentFilters.country = selectedCountry;

    if (selectedCountry === 'europe') {
      currentFilters.city = 'any';
      citySelect.innerHTML = '';
      citySelect.append(new Option('All cities', 'any', true));
    } else {
      populateCityFilter(locations, selectedCountry);
      currentFilters.city = '';
    }

    filtersChanged.notify(currentFilters);
  });

  citySelect.addEventListener('change', () => {
    currentFilters.city = citySelect.value;
    filtersChanged.notify(currentFilters);
  });

  weightSelect.addEventListener('change', () => {
    currentFilters.weight = weightSelect.value;
    filtersChanged.notify(currentFilters);
  });

  genderSelect.addEventListener('change', () => {
    const gender = genderSelect.value;
    populateWeightFilter(weights, gender);
    currentFilters.gender = gender;
    currentFilters.weight = '';
    filtersChanged.notify(currentFilters);
  });
}

function setupFilterSubscribers() {
  filtersChanged.subscribe((filters) => {
    const strategy = new CombinedFilter();
    const filteredBoxers = strategy.filter(boxers, filters);
    renderBoxerCards(filteredBoxers);

    const boxersCountElem = document.getElementById('boxers-count');
    if (boxersCountElem) {
      boxersCountElem.textContent = filteredBoxers.length;
    }
  });
}

export function setupSearchButtonListener() {
  const searchButton = document.querySelector('.search-button');
  searchButton.addEventListener('click', () => {
    filtersChanged.notify(currentFilters);  
    scrollToResults();                      
  });
}

function scrollToResults() {
  const results = document.getElementById('search-results');
  results?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
