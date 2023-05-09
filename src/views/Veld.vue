<template>
    <div id="mapContainer"></div>

    <div class="content">
        <a class="back" href="#">Terug</a>
        <h1 id="boerderijnaam"></h1>
        <h3>Jouw gekozen veld</h3>
        <p id="veldnaam"></p>
        <h3>Beschikbare gewassen</h3>
        <ul>
            <li>Wortel</li>
            <li>Aardappelen</li>
        </ul>
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
        let veldId = window.location.pathname.split("/")[2];
        // console.log(veldId);

        // fetch naar api fields
        const getField = "https://plant-en-pluk.onrender.com/api/v1/fields/" + veldId;
        fetch(getField)
            .then(response => response.json())
            .then(data => {
                // console.log(data.data.field);
                const field = data.data.field;

                // map toevoegen en inzoomen op loactie van veld
                this.map = L.map("mapContainer").setView([field.polygon[0].latitude, field.polygon[0].longitude], 18);
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    maxZoom: 20,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
                }).addTo(this.map);

                // polygon tekenen rond veld
                let polygonArray = [];
                for (let i = 0; i < field.polygon.length; i++) {
                    polygonArray.push([field.polygon[i].latitude, field.polygon[i].longitude]);
                }

                // console.log(polygonArray);

                const polygon = L.polygon(polygonArray, {
                    color: '#12B787',
                    fillColor: '#12B787',
                    fillOpacity: 1
                }).addTo(this.map);

                polygon.bringToFront();

                polygon.bindPopup(field.name);

                let backLink = document.querySelector('.back');
                // change href of backlink
                backLink.href = `/boerderij/${field.farmId}`;

                let veldNaam = document.querySelector('#veldnaam');
                veldNaam.innerHTML = field.name;

                // fetch naar api farms
                let farmId = field.farmId;

                const getFarmById = "https://plant-en-pluk.onrender.com/api/v1/farms/" + farmId;
                fetch(getFarmById)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data.data.farm);
                        const farm = data.data.farm;

                        // polygon tekenen rond veld
                        let polygonArray = [];
                        for (let i = 0; i < field.polygon.length; i++) {
                            polygonArray.push([farm.polygon[i].latitude, farm.polygon[i].longitude]);
                        }

                        // console.log(polygonArray);

                        const polygon = L.polygon(polygonArray, {
                            color: '#A8F2D3',
                            fillColor: '#A8F2D3',
                            fillOpacity: 1
                        }).addTo(this.map);

                        polygon.bringToBack();

                        let boerderijNaam = document.querySelector('#boerderijnaam');
                        boerderijNaam.innerHTML = farm.name;

                    })
                    .catch(error => {
                        console.log(error);
                    });
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

a {
    color: var(--deepSeaGreen500);
}

/*  desktop */
@media (min-width: 992px) {}
</style>