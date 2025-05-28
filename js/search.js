
// --------- Для фільтру міст --------
document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('country');
  const citySelect = document.getElementById('city');
  // Завантажуємо JSON з країнами та містами
  fetch('./json/locations.json')
    .then(res => res.json())
    .then(data => {
      const countries = data.countries;

      // Заповнюємо селект країн
      countrySelect.innerHTML = '<option value=""></option>';
      for (const key in countries) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = countries[key].name;
        countrySelect.appendChild(opt);
      }

      // При зміні країни оновлюємо селект міст
      countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value;

        if (selectedCountry === 'europe') {
          // Для All Europe — один опціон "All cities", автопозначений
          const allCitiesOption = new Option('All cities', 'any');
          allCitiesOption.selected = true;
          citySelect.appendChild(allCitiesOption);
        } else {
          // Для конкретної країни — список її міст
          const cities = countries[selectedCountry].cities || [];
          cities.forEach(city => {
            const option = new Option(city, city.toLowerCase().replace(/\s+/g, '-'));
            citySelect.appendChild(option);
          });
        }
      });
    })
    .catch(err => console.error('Error loading locations.json:', err));
});



// --------- Для ваги фільтр --------
const weightCategories = {
  male: [
    ' ', '50 kg', '55 kg', '60 kg', '65 kg', '70 kg',
    '75 kg', '80 kg', '85 kg', '90 kg', '+90 kg'
  ],
  female: [
    ' ', '48 kg', '51 kg', '54 kg', '57 kg', '60 kg',
    '65 kg', '70 kg', '75 kg', '80 kg', '+80 kg'
  ]
};

// Обробник зміни статі
document.getElementById('gender').addEventListener('change', function () {
  const gender = this.value;
  const weightSelect = document.getElementById('weight');

  // Очищаємо та оновлюємо список вагових категорій
  weightSelect.innerHTML = '';

  // Додаємо категорії відповідно до статі
  weightCategories[gender].forEach(weight => {
    const option = document.createElement('option');
    option.value = weight;
    option.textContent = weight;
    weightSelect.appendChild(option);
  });
});