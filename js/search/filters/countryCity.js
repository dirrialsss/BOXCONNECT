export function setupCountryCityFilter() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    fetch('./json/locations.json')
        .then(res => res.json())
        .then(data => {
            const countries = data.countries;
            countrySelect.innerHTML = '<option value=""></option>';

            for (const key in countries) {
                countrySelect.append(new Option(countries[key].name, key));
            }

            countrySelect.addEventListener('change', () => 
                updateCityOptions(countries, countrySelect.value, citySelect)
            );
        })
        .catch(err => console.error('Error loading locations.json:', err));
}

function updateCityOptions(countries, selectedCountry, citySelect) {
    citySelect.innerHTML = '';

    if (selectedCountry === 'europe') {
        citySelect.append(new Option('All cities', 'any', true));
    } else {
        citySelect.append(new Option('', '', true));
        citySelect.append(new Option('All cities', 'any'));
    }

    let cities = [];
    if (countries[selectedCountry] && countries[selectedCountry].cities) {
        cities = countries[selectedCountry].cities;
    }

    cities.forEach(city => {
        citySelect.append(new Option(city, city.toLowerCase().replace(/\s+/g, '-')));
    });
}