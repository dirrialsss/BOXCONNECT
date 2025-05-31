export function setupWeightFilter() {
    const genderSelect = document.getElementById('gender');
    const weightSelect = document.getElementById('weight');

    fetch('./json/weights.json')
        .then(res => res.json())
        .then(weightCategories => {
            genderSelect.addEventListener('change', () => {
                const gender = genderSelect.value;
                weightSelect.innerHTML = '';

                weightSelect.append(new Option('', '', true, true));

                if (weightCategories[gender]) {
                    weightCategories[gender].forEach(weight => {
                        weightSelect.append(new Option(weight, weight));
                    });
                }
            });
        })
        .catch(err => console.error('Error loading weights.json:', err));
}