export function populateCountryFilter(countries) {
  const countrySelect = document.getElementById('country');
  countrySelect.innerHTML = '<option value=""></option>';

  for (const key in countries) {
    countrySelect.append(new Option(countries[key].name, key));
  }
}

export function populateCityFilter(countries, selectedCountry) {
  const citySelect = document.getElementById('city');
  citySelect.innerHTML = '';

  if (selectedCountry === 'europe') {
    citySelect.append(new Option('All cities', 'any', true));
  } else {
    citySelect.append(new Option('', '', true));
    citySelect.append(new Option('All cities', 'any'));
  }

  const cities = countries[selectedCountry]?.cities || [];
  cities.forEach(city => {
    citySelect.append(new Option(city, city.toLowerCase().replace(/\s+/g, '-')));
  });
}

export function populateWeightFilter(weightsByGender, gender) {
  const weightSelect = document.getElementById('weight');
  weightSelect.innerHTML = '';
  weightSelect.append(new Option('', '', true, true));

  const weights = weightsByGender[gender] || [];
  weights.forEach(weight => {
    weightSelect.append(new Option(weight, weight));
  });
}
