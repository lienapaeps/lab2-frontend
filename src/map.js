import './style.css'

// const apiKey = "pk.eyJ1IjoicDY2bGllbmEiLCJhIjoiY2xoN2ZsMzZmMGZvczNtcWpsbmcwZ3JoNSJ9.B6OPjZwsVvDj5jiR73-4qw";

const myMap = L.map('map').setView([51.027421, 4.480052], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

let boerderijIcon = L.icon({
    iconUrl: 'src/assets/icon-boerderij.svg',
    iconSize: [40, 40],
    iconAnchor: [10, 10],
    popupAnchor: [7, -5]
});

// fetch naar api
const url = "http://localhost:3000/api/v1/farms";
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.data.farms);
        const farms = data.data.farms;

        farms.forEach(farm => {
            const marker = L.marker([farm.location.latitude, farm.location.longitude], {icon: boerderijIcon}).addTo(myMap);
            marker.bindPopup(
                // link naar pagina met meer info over de boerderij via id
                `<b>${farm.name}</b><br><a href='boerderij.html?id=${farm._id}'>Meer info</a>`
            ).openPopup();
        });
    })
    .catch(error => console.log(error));

// search bar and zoom buttons
L.Control.geocoder().addTo(myMap);

// position search bar in the center of screen
document.querySelector('.leaflet-control-geocoder').style.top = '20px';
document.querySelector('.leaflet-control-geocoder').style.right = '45px';

// make search bar expanded
document.querySelector('.leaflet-control-geocoder').classList.add('leaflet-control-geocoder-expanded');

//change position of zoom buttons
document.querySelector('.leaflet-control-zoom').style.top = '100px';
document.querySelector('.leaflet-control-zoom').style.left = '45px';

// change width of search bar
document.querySelector('.leaflet-control-geocoder-form input').style.width = '400px';
document.querySelector('.leaflet-control-geocoder-form input').style.height = '40px';

// change placeholder of search bar
document.querySelector('.leaflet-control-geocoder-form input').placeholder = 'Zoeken';
