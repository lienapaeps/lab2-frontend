<template>
    <div class="content">
        <h1>Je velden toevoegen</h1>

        <div class="alert hidden">
            Here is some feedback
        </div>
        <div class="form-group">
            <form action="#">
                <h2>Stap 2</h2>
                <p>Teken nu op de map de grootte van je velden die je zult verhuren.</p>
                <div id="mapContainer"></div>

                <input type="submit" value="Volgende">

                <!-- locatie -->
                <!-- polygon -->
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
        L.Control.geocoder().addTo(this.map);

        // get response from search
        this.map.on('geocoder/showlocation', function (e) {
            console.log(e);
        });

        // https://docs.mapbox.com/mapbox.js/api/v3.3.1/

        // add drawing tool to map https://github.com/geoman-io/leaflet-geoman
        this.map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
            drawMarker: false,
            drawPolyline: false,
            drawRectangle: false,
            drawCircleMarker: false,
            drawPolygon: true,
            editMode: false,
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
            console.log(coordinates);

        });

        // make search bar expanded
        document.querySelector('.leaflet-control-geocoder').classList.add('leaflet-control-geocoder-expanded');

        // change width of search bar
        document.querySelector('.leaflet-control-geocoder-form input').style.width = '400px';
        document.querySelector('.leaflet-control-geocoder-form input').style.height = '40px';

        // change placeholder of search bar
        document.querySelector('.leaflet-control-geocoder-form input').placeholder = 'Zoeken';
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
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: var(--deepSeaGreen800);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
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
}

/*  desktop */
@media (min-width: 992px) {}
</style>