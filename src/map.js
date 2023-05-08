// import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
// import router from './router/router.js'

// createApp(App).use(router).mount('#app')

// const apiKey = "pk.eyJ1IjoicDY2bGllbmEiLCJhIjoiY2xoN2ZsMzZmMGZvczNtcWpsbmcwZ3JoNSJ9.B6OPjZwsVvDj5jiR73-4qw";

const myMap = L.map('map').setView([51.027421, 4.480052], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

let boerderijIcon = L.icon({
    iconUrl: 'src/assets/icon-boerderij.svg',
    iconSize: [35, 35],
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


// const marker = L.marker([50.9637819, 4.5256353], {icon: boerderijIcon}).addTo(myMap);
// marker.bindPopup(
//     "<b>Boerderij Terrijn</b><br><a href='veld.html'>Meer info</a>"
// ).openPopup();

L.Control.geocoder().addTo(myMap);
// change width of search bar
document.querySelector('.leaflet-control-geocoder-form input').style.width = '200px';
// change placeholder of search bar
document.querySelector('.leaflet-control-geocoder-form input').placeholder = 'Zoek een locatie';
