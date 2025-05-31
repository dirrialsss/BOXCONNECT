export function loadBoxerCards() {
    fetch('json/boxers.json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('boxers-count').textContent = data.length;
            const container = document.getElementById('boxers-container');
            const template = document.getElementById('boxer-card-template');

            data.forEach(boxer => {
                const clone = template.content.cloneNode(true);

                clone.querySelector('img.boxer-photo-img').src = boxer.photo;
                clone.querySelector('img.boxer-photo-img').alt = boxer.name;
                clone.querySelector('.boxer-name').textContent = boxer.name;
                clone.querySelector('img.country-flag').src = boxer.flag;
                clone.querySelector('img.country-flag').alt = boxer.country;

                const locationLink = clone.querySelector('.boxer-location');
                locationLink.textContent = `${boxer.city}, ${boxer.country}`;
                locationLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(boxer.city + ', ' + boxer.country)}`;

                clone.querySelector('.boxer-weight').textContent = `Weight: ${boxer.weight}`;
                clone.querySelector('.boxer-height').textContent = `Height: ${boxer.height}`;
                clone.querySelector('.boxer-age').textContent = `Age: ${boxer.age}`;
                clone.querySelector('.boxer-level').textContent = `Level: ${boxer.level}`;
                clone.querySelector('.boxer-stance').textContent = boxer.stance;

                container.appendChild(clone);
            });
        })
        .catch(err => {
            console.log('Error:', err);
            document.getElementById('boxers-count').textContent = '0';
        });
}