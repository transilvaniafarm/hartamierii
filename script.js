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
