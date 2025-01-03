console.log("Harta Mierii este funcțională!");
// Creăm hartă și setăm locația inițială și nivelul de zoom
var map = L.map('map').setView([45.0, 25.0], 6); // Latitudine și longitudine pentru centrul hărții

// Adăugăm un layer de fundal (hartă)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adăugăm un marker pentru un apicultor
L.marker([45.0, 25.0]).addTo(map)
  .bindPopup("Apicultor 1")
  .openPopup();
// Obținem referința la formular
const form = document.getElementById('apicultor-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Colectăm datele din formular
  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value.split(',');
  const contact = document.getElementById('contact').value;
  const honeyType = document.getElementById('honeyType').value;
  const otherProducts = document.getElementById('otherProducts').value;

  // Validăm locația (latitudine, longitudine)
  if (location.length !== 2 || isNaN(location[0]) || isNaN(location[1])) {
    alert("Locația trebuie să fie formată din două valori numerice (latitudine, longitudine).");
    return;
  }

  // Adăugăm datele în Firestore
  try {
    await db.collection('apicultori').add({
      name: name,
      location: {
        lat: parseFloat(location[0]),
        lng: parseFloat(location[1]),
      },
      contact: contact,
      honeyType: honeyType,
      otherProducts: otherProducts || "N/A", // Dacă nu sunt produse adăugate, se pune "N/A"
    });
    alert('Apicultorul a fost adăugat cu succes!');
    form.reset();
  } catch (error) {
    console.error('Eroare la adăugarea apicultorului:', error);
  }
  // Funcția care încarcă apicultorii pe hartă
const loadApicultori = async () => {
  const apicultoriSnapshot = await db.collection('apicultori').get();
  apicultoriSnapshot.forEach(doc => {
    const apicultor = doc.data();
    const { lat, lng } = apicultor.location;
    const { name, contact, honeyType, otherProducts } = apicultor;

    // Adăugăm marker pe hartă
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`
        <b>${name}</b><br>
        <strong>Contact:</strong> ${contact}<br>
        <strong>Tip Miere:</strong> ${honeyType}<br>
        <strong>Alte Produse:</strong> ${otherProducts}
      `);
  });
};

// Încarcă apicultorii la încărcarea paginii
loadApicultori();
});
