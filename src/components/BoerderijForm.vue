<template>
    <div class="content">
        <h1>Je boerderij toevoegen</h1>

        <div class="alert hidden">
            Here is some feedback
        </div>
        <div class="form-group">
            <div class="alert hidden">
                Here is some feedback
            </div>
            <form id="boerderij" action="#">
                <div class="group">
                    <label for="name">Boerderij naam</label>
                    <input type="text" id="name" name="name" placeholder="Boerderij naam">
                </div>
                <div class="group-group">
                    <div class="group">
                        <label for="street">Straat</label>
                        <input type="text" id="street" name="street" placeholder="Straat">
                    </div>
                    <div class="group">
                        <label for="streetnumber">Huisnummer</label>
                        <input type="text" id="streetnumber" name="streetnumber" placeholder="Huisnummer">
                    </div>
                </div>
                <div class="group-group">
                    <div class="group">
                        <label for="postalcode">Postcode</label>
                        <input type="text" id="postalcode" name="postalcode" placeholder="Postcode">
                    </div>
                    <div class="group">
                        <label for="city">Stad</label>
                        <input type="text" id="city" name="city" placeholder="Stad">
                    </div>
                </div>
                <div class="group-group">
                    <div class="group">
                        <label for="phonenumber">Telefoonnummer</label>
                        <input type="text" id="phonenumber" name="phonenumber" placeholder="Telefoonnummer">
                    </div>
                </div>
                <div class="group-group">
                    <div class="group">
                        <label for="crops">Selecteer welke gewassen er geplant kunnen worden op je velden:</label>
                        <select name="crops" id="crops" multiple></select>
                    </div>
                </div>

                <p>Zoek op de map je adres en teken de oppervlakte van je boerderij.</p>
                <div id="mapContainer"></div>
                <p id="polygon"></p>
                <p id="location"></p>

                <input type="submit" value="Toevoegen">
            </form>
        </div>

    </div>
</template>

<script>
// import "leaflet/dist/leaflet.css";
import L from "leaflet";

// import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

export default {
    name: "LeafletMap",
    data() {
        return {
            map: null,
            searchControl: null,
        };
    },
    mounted() {

        this.map = L.map("mapContainer").setView([51.027421, 4.480052], 11);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // search bar and zoom buttons
        let geocoder = L.Control.geocoder().addTo(this.map);

        // get location from search
        geocoder.on("markgeocode", function (e) {
            // console.log(e.geocode.center);
            document.querySelector('#location').value = e.geocode.center;
        });

        // add drawing tool to map https://github.com/geoman-io/leaflet-geoman
        this.map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
            drawMarker: false,
            drawPolyline: false,
            drawRectangle: false,
            drawCircleMarker: false,
            drawPolygon: true,
            editMode: true,
            dragMode: false,
            cutPolygon: false,
            removalMode: true,
            textMarker: false,

        });

        // add event listener to map
        this.map.on('pm:create', e => {
            // console.log(e);

            // get coordinates of polygon
            let coordinates = e.layer._latlngs[0];
            // console.log(coordinates);

            // add coordinates to hidden input field
            document.querySelector('#polygon').value = coordinates;
        });

        // make search bar expanded
        document.querySelector('.leaflet-control-geocoder').classList.add('leaflet-control-geocoder-expanded');

        // change width of search bar
        document.querySelector('.leaflet-control-geocoder-form input').style.width = '400px';
        document.querySelector('.leaflet-control-geocoder-form input').style.height = '40px';

        // change placeholder of search bar
        document.querySelector('.leaflet-control-geocoder-form input').placeholder = 'Zoeken';

        let groenten = [
            "Aardpeer",
            "Ajuin",
            "Andijvie",
            "Artisjok",
            "Asperge (groen)",
            "Asperge (wit)",
            "Aubergine",
            "Augurk",
            "Bloemkool",
            "Boerenkool",
            "Broccoli",
            "Champignons",
            "Courgette",
            "Groene kool",
            "IJsbergsla",
            "Kervel",
            "Knolselder",
            "Komkommer",
            "Kropsla",
            "Paksoi",
            "Paprika",
            "Pastinaak",
            "Peultjes",
            "Prei",
            "Raap",
            "Radijs",
            "Rammenas",
            "Rode biet",
            "Rode kool",
            "Rucola",
            "Savooikool",
            "Schorseneer",
            "Selder",
            "Snijboon",
            "Spinazie",
            "Spitskool",
            "Spruitjes",
            "Tomaten",
            "Tuinbonen",
            "Venkel",
            "Witloof",
            "Witte kool",
            "Wortel",
            "Zeekool",
            "Zevenblad",
            "Zomerpostelein",
            "Zomerpompoen"
        ]

        let fruit = [
            "Aardbei",
            "Appel",
            "Blauwe bes",
            "Braam bes",
            "Cassisbes",
            "Framboos",
            "Kers",
            "Kiwibes",
            "Kweepeer",
            "Peer",
            "Pruim",
            "Rode bes",
            "Stekelbes",
            "Veenbes"]

        // use groenten array to create options in select
        let select = document.querySelector('#crops');
        groenten.forEach(groente => {
            let option = document.createElement('option');
            option.value = groente;
            option.innerHTML = groente;
            select.appendChild(option);
        });

        // use fruit array to create options in select
        fruit.forEach(fruit => {
            let option = document.createElement('option');
            option.value = fruit;
            option.innerHTML = fruit;
            select.appendChild(option);
        });

        // luister naar submit
        document.querySelector('#boerderij').addEventListener('submit', e => {
            e.preventDefault();

            let name = document.querySelector('#name').value;
            let street = document.querySelector('#street').value;
            let streetnumber = document.querySelector('#streetnumber').value;
            let postalcode = document.querySelector('#postalcode').value;
            let city = document.querySelector('#city').value;
            let phonenumber = document.querySelector('#phonenumber').value;

            let crops = [];
            let select = document.querySelector('#crops');
            for (let i = 0; i < select.length; i++) {
                if (select.options[i].selected) {
                    crops.push(select.options[i].value);
                }
            }

            let coordinates = document.querySelector('#polygon').value;
            let location = document.querySelector('#location').value;

            let dataBoerderij = {
                name: name,
                street: street,
                streetnumber: streetnumber,
                postalcode: postalcode,
                city: city,
                phonenumber: phonenumber,
                crops: crops,
                polygon: coordinates,
                location: location
            }

            console.log(dataBoerderij);

            // post data to api
            fetch("https://plant-en-pluk.onrender.com/api/v1/farms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                mode: "cors",
                body: JSON.stringify(dataBoerderij)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if (data.status === "success") {
                        console.log("tis gelukt");
                        window.location.href = "/profiel/boerderijen";
                    } else {
                        let feedback = document.querySelector(".alert");
                        feedback.textContent = data.message;
                        feedback.classList.remove("hidden");
                        feedback.style.backgroundColor = "#f8d7da";
                        feedback.style.color = "#C82424";
                        window.scrollTo(0, 0);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    },
    onBeforeUnmount() {
        if (this.map) {
            this.map.remove();
        }
    },
};

</script>

<style scoped>
/*  mobile */
#mapContainer {
    width: 100%;
    height: 500px;
    margin-bottom: 2rem;
}

.content {
    margin-left: 25%;
    padding-left: 2rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
}

/* form  */
input[type=text],
select {
    width: 100%;
    padding: 1rem 1rem;
    margin: .5rem 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: var(--deepSeaGreen800);
    color: white;
    padding: 1rem 1.5rem;
    margin: .5rem 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: var(--deepSeaGreen500);
}

.form-group {
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 3rem;
    margin-right: 2rem;
}

.group {
    margin-bottom: .5rem;
    width: 100%;
}

.group-group {
    display: flex;
    flex-direction: row;
    gap: 2rem;
}

/*  desktop */
@media (min-width: 992px) {}
</style>