<template>
    <div id="mapContainer"></div>

    <div class="content">
        <a class="back" href="/map">Terug</a>
        <h1 id="boerderijnaam"></h1>
        <p id="adres"></p>

        <div id="velden">
            <h2>Velden</h2>
        </div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
    name: "LeafletMap",
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        let boerderijId = window.location.pathname.split("/")[2];
        // console.log(boerderijId);

        // fetch naar api farms
        const url = "http://localhost:3000/api/v1/farms/" + boerderijId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data.data.farm);
                const farm = data.data.farm;

                // map toevoegen en inzoomen op loactie van boerderij
                this.map = L.map("mapContainer").setView([farm.location.latitude, farm.location.longitude], 17);
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    maxZoom: 20,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
                }).addTo(this.map);

                // polygon tekenen rond boerderij
                let polygonArray = [];
                for (let i = 0; i < farm.polygon.length; i++) {
                    polygonArray.push([farm.polygon[i].latitude, farm.polygon[i].longitude]);
                }

                // console.log(polygonArray);

                const polygon = L.polygon(polygonArray, {
                    color: '#12B787',
                    fillColor: '#A8F2D3',
                    fillOpacity: 0.5
                }).addTo(this.map);

                polygon.bindPopup(farm.name);

                // info over boerderij
                let naam = document.querySelector('#boerderijnaam');
                let adres = document.querySelector('#adres');
                naam.innerHTML = farm.name;
                adres.innerHTML = farm.street + ' ' + farm.streetnumber + ', ' + farm.postalcode + ' ' + farm.city;

            })
            .catch(error => {
                console.log(error);
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
    width: 75%;
    height: 350px;
    margin-left: 25%;
}

.content {
    margin-left: 25%;
    padding-left: 1rem;
    margin-top: 1rem;
}

a.back {
    color: var(--deepSeaGreen500);
}

/*  desktop */
@media (min-width: 992px) {}
</style>