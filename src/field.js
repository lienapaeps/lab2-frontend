// const apiKey = "pk.eyJ1IjoicDY2bGllbmEiLCJhIjoiY2xoN2ZsMzZmMGZvczNtcWpsbmcwZ3JoNSJ9.B6OPjZwsVvDj5jiR73-4qw";

// toon map op de locatie van de id die in de url staat
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
// console.log(id);

const farmId = urlParams.get('farmId');
// console.log(farmId);

const url = `http://localhost:3000/api/v1/fields/${id}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(data.data.field);
        const field = data.data.field;

        const myMap = L.map('map').setView([field.polygon[0].latitude, field.polygon[0].longitude], 18);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(myMap);

        let polygonArray = [];
        for (let i = 0; i < field.polygon.length; i++) {
            polygonArray.push([field.polygon[i].latitude, field.polygon[i].longitude]);
        }

        // console.log(polygonArray);

        const polygon = L.polygon(polygonArray, {
            color: '#12B787',
            fillColor: '#12B787',
            fillOpacity: 1,
            zIndex: 1000
        }).addTo(myMap);

        polygon.bringToFront();

        polygon.bindPopup(field.name);

        // boerderij
        const url2 = `http://localhost:3000/api/v1/farms/${farmId}`;
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log(data.data.farm);
                const farm = data.data.farm;

                let boerderij = document.querySelector('#boerderijnaam');
                boerderij.innerHTML = farm.name;

                let backLink = document.querySelector('.backLink');
                // change href of backlink
                backLink.href = `boerderij.html?id=${farm._id}`;

                let polygonArray = [];
                for (let i = 0; i < farm.polygon.length; i++) {
                    polygonArray.push([farm.polygon[i].latitude, farm.polygon[i].longitude]);
                }
        
                // console.log(polygonArray);
        
                const polygon = L.polygon(polygonArray, {
                    color: '#12B787',
                    fillColor: '#A8F2D3',
                    fillOpacity: 1,
                    zIndex: 100
                }).addTo(myMap);

                polygon.bringToBack();
        });

        
});


