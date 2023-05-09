<template>
    <div id="mapContainer"></div>

    <div class="content">
        <a class="back" href="#">Terug</a>
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
        const getField = "http://localhost:3000/api/v1/fields/" + veldId;
        fetch(getField)
            .then(response => response.json())
            .then(data => {
                console.log(data.data.field);
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
                    fillColor: '#A8F2D3',
                    fillOpacity: 0.5
                }).addTo(this.map);

                polygon.bindPopup(field.name);

                let backLink = document.querySelector('.back');
                // change href of backlink
                backLink.href = `/boerderij/${field.farmId}`;
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