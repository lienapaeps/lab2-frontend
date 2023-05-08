const apiKey = "pk.eyJ1IjoicDY2bGllbmEiLCJhIjoiY2xoN2ZsMzZmMGZvczNtcWpsbmcwZ3JoNSJ9.B6OPjZwsVvDj5jiR73-4qw";

// toon map op de locatie van de id die in de url staat
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const url = `http://localhost:3000/api/v1/farms/${id}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.data.farm);
        const farm = data.data.farm;

        const myMap = L.map('map').setView([farm.location.latitude, farm.location.longitude], 17);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(myMap);


        let polygonArray = [];
        for (let i = 0; i < farm.polygon.length; i++) {
            polygonArray.push([farm.polygon[i].latitude, farm.polygon[i].longitude]);
        }

        console.log(polygonArray);

        const polygon = L.polygon(polygonArray, {
            color: '#12B787',
            fillColor: '#A8F2D3',
            fillOpacity: 0.5
        }).addTo(myMap);

        polygon.bindPopup(farm.name);

        // myMap.dragging.disable();

        let naam = document.querySelector('#boerderijnaam');
        let adres = document.querySelector('#adres');
        naam.innerHTML = farm.name;
        adres.innerHTML = farm.street + ' ' + farm.streetnumber + ', ' + farm.postalcode + ' ' + farm.city;
});

const url2 = `http://localhost:3000/api/v1/fields/farm/${id}`;
fetch(url2)
    .then(response => response.json())
    .then(data => {
        console.log(data.data.fields);
        const field = data.data.fields;

        // loop over fields
        for (let i = 0; i < field.length; i++) {
            // console.log(field[i].name);

            let card = document.createElement('div');
            card.classList.add('veld');
            card.innerHTML = `
            <h3>${field[i].name}</h3>
            <p>${field[i].owners}</p>
            <p>${field[i].size} m²</p>
            <p>${field[i].crops}</p>
            <a href="veld.html?id=${field[i]._id}&farmId=${field[i].farmId}">Huren</a>
            `;

            document.querySelector('#velden').appendChild(card);
        }
    });
