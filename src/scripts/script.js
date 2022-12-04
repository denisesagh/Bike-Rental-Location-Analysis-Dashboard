var map = L.map('map', {
    center: [49.988799, 8.227393],
    zoom: 14
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);