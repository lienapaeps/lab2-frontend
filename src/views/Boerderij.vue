<template>
    <div id="mapContainer"></div>

    <div class="content">
        <a href="/map">Terug</a>
        <h1 id="boerderijnaam"></h1>
        <div class="boerderij-info">
            <img class="icon" src="/EmblemInfo.svg" alt="info">
            <p id="adres"></p>
        </div>
        <div class="boerderij-info">
            <img class="icon" src="/EmblemPhone.svg" alt="phone">
            <p id="phonenumber"></p>
        </div>


        <h2>Velden</h2>
        <div id="velden">
            <div class="card-veld">
                <h3 id="veldnaam"></h3>
                <div class="test">
                    <p class="free">Beschikbaar</p>
                </div>
                <p id="eigenaars"></p>
                <p id="grootte"></p>
                <p id="crops"></p>
            </div>
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
        const getFarm = "https://plant-en-pluk.onrender.com/api/v1/farms/" + boerderijId;
        fetch(getFarm, {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.data.farm);
                const farm = data.data.farm;

                // map toevoegen en inzoomen op loactie van boerderij
                this.map = L.map("mapContainer").setView([farm.location.lat, farm.location.lng], 17);
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    maxZoom: 20,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
                }).addTo(this.map);

                // polygon tekenen rond boerderij
                let polygonArray = [];
                for (let i = 0; i < farm.polygon.length; i++) {
                    polygonArray.push([farm.polygon[i].lat, farm.polygon[i].lng]);
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
                let phonenumber = document.querySelector('#phonenumber');
                naam.innerHTML = farm.name;
                adres.innerHTML = farm.street + ' ' + farm.streetnumber + ', ' + farm.postalcode + ' ' + farm.city;
                phonenumber.innerHTML = farm.phonenumber;

            })
            .catch(error => {
                console.log(error);
            });

        const getFields = "https://plant-en-pluk.onrender.com/api/v1/fields/farm/" + boerderijId;
        console.log(getFields);

        fetch(getFields, {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                console.log(data.data.fields);
                const field = data.data.fields;

                // loop over fields
                for (let i = 0; i < field.length; i++) {
                    // console.log(field[i].name);

                    let card = document.querySelector('.card-veld').cloneNode(true);
                    card.querySelector('#veldnaam').innerHTML = field[i].name;
                    card.querySelector('#eigenaars').innerHTML = field[i].owner.firstname;
                    card.querySelector('#grootte').innerHTML = field[i].size + 'm²';
                    card.querySelector('#crops').innerHTML = field[i].crops;


                    // add link to rent field in card
                    let link = document.createElement('a');
                    link.setAttribute('href', '/veld/' + field[i]._id);
                    link.innerHTML = 'Huren';
                    link.classList.add('btn');
                    card.appendChild(link);

                    document.querySelector('#velden').appendChild(card);
                }
            })
            .catch(error => {
                console.log(error);
                window.location.href = "/login";
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
    height: 300px;
}

#velden {
    display: flex;
    width: 100%;
    flex-direction: column;
}

#boerderijnaam {
    margin: 0;
}

.free {
    background-color: var(--deepSeaGreen500);
    color: #fff;
    padding: 10px;
    margin-right: 70%;
    border-radius: 4px;
    text-align: center;
}

.boerderij-info {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 1rem;
}

.card-veld {
    width: 70%;
    background-color: #fff;
    margin-right: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-veld:nth-child(1) {
    display: none;
}

.content {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 1rem;
}

#veldnaam {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}


/*  desktop */
@media (min-width: 992px) {
    #velden {
        display: flex;
        flex-direction: row;
    }
}

@media (min-width: 692px) {
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
}
</style>