// Inițializare hartă
const map = L.map('map').setView([45.0, 25.0], 6); // Setează centrul hărții la coordonatele României

// TileLayer pentru OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Obține formularul și gestionează trimiterea acestuia
const form = document.getElementById('apicultorForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne reîncărcarea paginii

    // Preluare date din formular
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value.split(',');
    const contact = document.getElementById('contact').value;
    const honeyType = document.getElementById('honeyType').value;
    const otherProducts = document.getElementById('otherProducts').value;

    // Verifică dacă locația conține latitudine și longitudine
    if (location.length === 2) {
        const lat = parseFloat(location[0]);
        const lng = parseFloat(location[1]);

        // Adaugă un marker pe hartă la locația specificată
        const marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${name}</b><br>${contact}<br>${honeyType ? 'Miere: ' + honeyType : ''}<br>${otherProducts ? 'Alte produse: ' + otherProducts : ''}`);

        // Resetează formularul
        form.reset();

        // Alertă pentru confirmare
        alert('Apicultorul a fost adăugat pe hartă!');
    } else {
        alert('Locația trebuie să fie un format corect (latitudine, longitudine).');
    }
});
