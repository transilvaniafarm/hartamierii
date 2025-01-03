// Inițializare hartă Leaflet
const map = L.map('map').setView([45.0, 25.0], 6); // Centrat pe România

// TileLayer pentru OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Butonul pentru deschiderea formularului
const addApicultorBtn = document.getElementById('addApicultorBtn');
const apicultorFormContainer = document.getElementById('apicultorFormContainer');
const cancelBtn = document.getElementById('cancelBtn');

// Afișează formularul când se apasă pe buton
addApicultorBtn.addEventListener('click', () => {
    apicultorFormContainer.style.display = 'block';
});

// Anulează formularul și îl ascunde
cancelBtn.addEventListener('click', () => {
    apicultorFormContainer.style.display = 'none';
});

// Preia datele din formular și adaugă un marker pe hartă
const apicultorForm = document.getElementById('apicultorForm');
apicultorForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Preia valorile din formular
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value.split(',');
    const contact = document.getElementById('contact').value;
    const honeyType = document.getElementById('honeyType').value;
    const otherProducts = document.getElementById('otherProducts').value;

    if (location.length === 2) {
        const lat = parseFloat(location[0]);
        const lng = parseFloat(location[1]);

        // Adaugă un marker pe hartă
        const marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${name}</b><br>${contact}<br>${honeyType ? 'Miere: ' + honeyType : ''}<br>${otherProducts ? 'Alte produse: ' + otherProducts : ''}`);

        // Resetează formularul și îl ascunde
        apicultorForm.reset();
        apicultorFormContainer.style.display = 'none';

        // Alertă pentru confirmare
        alert('Apicultorul a fost adăugat pe hartă!');
    } else {
        alert('Locația trebuie să fie un format corect (latitudine, longitudine).');
    }
});
