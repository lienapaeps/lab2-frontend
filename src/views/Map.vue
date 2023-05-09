<template>
    <div id="mapContainer"></div>

    <div class="arrow">
        <router-link exact to="/velden">
            <img src="./../assets/left-arrow.svg" alt="arrow" />
        </router-link>
    </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'

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
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // search bar and zoom buttons
        L.Control.geocoder().addTo(this.map);

        // position search bar
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

        // marker icon for farm
        let boerderijIcon = L.icon({
            iconUrl: 'src/assets/icon-boerderij.svg',
            iconSize: [40, 40],
            iconAnchor: [10, 10],
            popupAnchor: [7, -5]
        });

        // add a marker for each farm in the database via api fetch
        const url = "https://plant-en-pluk.onrender.com/api/v1/farms";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.data.farms);
                const farms = data.data.farms;

                farms.forEach(farm => {
                    const marker = L.marker([farm.location.latitude, farm.location.longitude], { icon: boerderijIcon }).addTo(this.map);
                    marker.bindPopup(
                        // vue router link naar pagina met meer info over de boerderij via id in de url
                        `<b>${farm.name}</b><br><a href='boerderij/${farm._id}'>Meer info</a>`
                    ).openPopup();
                });
            })
            .catch(error => console.log(error));
    },
    onBeforeUnmount() {
        if (this.map) {
            this.map.remove();
        }
    },
};
</script>
  
<style scoped>
#mapContainer {
    width: 100vw;
    height: 100vh;
    z-index: 1;
}

.arrow {
    position: absolute;
    top: 2rem;
    left: 50px;
    z-index: 2;
}
</style>