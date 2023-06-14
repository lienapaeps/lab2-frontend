<template>
    <div id="mapContainer"></div>

    <div class="content">
        <div class="arrow">
            <router-link exact to="/map">
                <img src="./../assets/left-arrow.svg" alt="arrow" />
            </router-link>
        </div>
        <h1 id="boerderijnaam"></h1>
        <div class="boerderij-info">
            <img class="icon" src="/EmblemInfo.svg" alt="info">
            <p id="adres"></p>
        </div>
        <div class="boerderij-info">
            <img class="icon" src="/EmblemPhone.svg" alt="phone">
            <p id="phonenumber"></p>
        </div>

        <div class="alert hidden">
            Here is some feedback
        </div>

        <h2>Velden</h2>
        <div id="velden">
            <div class="card-veld">
                <h3 id="veldnaam"></h3>
                <div class="availability">
                </div>
                <p id="eigenaars"></p>
                <p id="grootte"></p>
                <h4>Beschikbare gewassen:</h4>
                <p id="crops"></p>
                <a class="btn" href="#">Huren</a>
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

                //change position of zoom buttons
                document.querySelector('.leaflet-control-zoom').style.top = '100px';
                document.querySelector('.leaflet-control-zoom').style.left = '10px';

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
                naam.innerHTML = "Boerderij " + farm.name;
                adres.innerHTML = farm.street + ' ' + farm.streetnumber + ', ' + farm.postalcode + ' ' + farm.city;
                phonenumber.innerHTML = farm.phonenumber;

            })
            .catch(error => {
                console.log(error);
            });

        const getFields = "https://plant-en-pluk.onrender.com/api/v1/fields/farm/" + boerderijId;

        fetch(getFields, {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.data.fields);
                const field = data.data.fields;

                // loop over fields
                for (let i = 0; i < field.length; i++) {
                    // console.log(field[i].name);

                    let card = document.querySelector('.card-veld').cloneNode(true);
                    card.querySelector('#veldnaam').innerHTML = field[i].name;
                    // card.querySelector('#eigenaars').innerHTML = field[i].owner;

                    // loop over owners array
                    let owners = field[i].owner;
                    let ownerArray = [];
                    for (let j = 0; j < owners.length; j++) {
                        ownerArray.push(owners[j].name);
                    }
                    card.querySelector('#eigenaars').innerHTML = "Eigenaars: " + ownerArray.join(', ');

                    if (ownerArray.length === 0) {
                        card.querySelector('#eigenaars').innerHTML = 'Nog geen eigenaar';
                    }

                    card.querySelector('#grootte').innerHTML = "Grootte: " + field[i].size + 'm²';

                    let crops = field[i].crops;
                    let cropsArray = [];
                    for (let j = 0; j < crops.length; j++) {
                        cropsArray.push(crops[j].name);
                    }
                    card.querySelector('#crops').innerHTML = cropsArray.join(', ');

                    let fieldId = field[i]._id;
                    // console.log(fieldId);

                    if (field[i].available === false || field[i].owner.length === 3) {
                        card.querySelector('.availability').classList.add('rented');
                        card.querySelector('.availability').innerHTML = 'Verhuurd';
                        card.querySelector('.btn').classList.add('disabled');
                    } else {
                        card.querySelector('.availability').classList.add('available');
                        card.querySelector('.availability').innerHTML = 'Beschikbaar';
                    }

                    document.querySelector('#velden').appendChild(card);

                    // wanneer er op de knop 'huren' wordt geklikt, wordt de gebruiker naar de pagina van huur veld gestuurd met id van het veld in de url
                    card.querySelector('.btn').addEventListener('click', () => {
                        window.location.href = "/huur-veld/" + fieldId;
                    });
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
    z-index: 0;
}

#velden {
    display: flex;
    width: 100%;
    flex-direction: column;
}

#veldnaam {
    text-transform: capitalize;
}

#boerderijnaam {
    margin-top: 1rem;
}

a.btn {
    color: var(--offWhite);
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

.rented {
    font-family: "DM Sans", sans-serif;
    color: #fff;
    background-color: var(--semanticRed);
    max-width: 140px;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
}

.available {
    font-family: "DM Sans", sans-serif;
    color: #fff;
    background-color: var(--deepSeaGreen500);
    max-width: 140px;
    text-align: center;
    padding: 10px;
    border-radius: 4px;

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

a {
    color: var(--offBlack900);
}

.arrow {
    position: absolute;
    top: 50px;
    left: 15px;
    z-index: 10;
}

/*  desktop */
@media (min-width: 992px) {
    #velden {
        display: flex;
        flex-direction: row;
    }

    .arrow {
        left: 26%;
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