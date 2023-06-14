<script setup>
import { ref, reactive, onMounted } from 'vue';
import Weer from '../components/Weer.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

// get firstname from token in localstorage
const token = localStorage.getItem('token');
const base64Url = token.split('.')[1];
const base64 = base64Url.replace('-', '+').replace('_', '/');
const user = JSON.parse(window.atob(base64));
// console.log(user.firstname);

let firstname = user.firstname;
let userId = user.uid;

let velden = reactive({
    velden: [],
    farmIds: [],
})

let cropIds = [];

function getVeldByUserId() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/fields/user/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            // console.log(json);
            velden.velden = json.data.fields;
            console.log(velden);

            velden.farmIds = json.data.fields.map(field => field.farmId);

            // cropId = velden.velden[0].plannedCrops[0]._id;

            // slaag alle cropIds op in een array
            velden.velden.forEach(veld => {
                veld.plannedCrops.forEach(crop => {
                    cropIds.push(crop._id);
                })
            })

        }).catch(err => {
            console.log(err);
        })
    }
}

function getFarmById(farmId) {
    if (localStorage.getItem("token")) {
        velden.farmIds.forEach(farmId => {
            fetch("https://plant-en-pluk.onrender.com/api/v1/farms/" + farmId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                mode: "cors",
            }).then(res => {
                return res.json();
            }).then(json => {
                // console.log(json.data.farm.name);

                velden.velden.forEach(veld => {
                    if (veld.farmId == farmId) {
                        veld.farmName = json.data.farm.name;
                    }
                })

            }).catch(err => {
                console.log(err);
            })
        })
    }
}

function getCropById(cropId) {
    if (localStorage.getItem("token")) {
        cropIds.forEach(cropId => {
            fetch("https://plant-en-pluk.onrender.com/api/v1/crops/" + cropId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                mode: "cors",
            })
                .then(res => res.json())
                .then(json => {
                    // console.log(json)

                    velden.velden.forEach(veld => {
                        veld.plannedCrops.forEach(crop => {
                            if (crop._id == cropId) {
                                crop.name = json.data.crop.name;
                                crop.growthStage = json.data.crop.growthStage;
                            }
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        })
    }
}

onMounted(() => {
    getVeldByUserId();
})

</script>

<template>
    <div class="container">
        <div class="content">
            <div class="nav">
                <h1 class="title">Welkom terug, {{ firstname }}</h1>
            </div>

            <h2>Recent</h2>
            <div class="card-reel">
                <div class="card" v-for="veld in  velden.velden " :key="veld.id">
                    <div class="card-body">
                        <p class="card-title" id="farmName">Boerderij {{ getFarmById(veld.farmId) }} {{ veld.farmName }}</p>
                        <p>{{ veld.name }}</p>
                        <span id="gewassen" v-for="crop in veld.plannedCrops" :key="crop.id">{{ crop.name }}</span>
                        <p>{{ getCropById(veld.cropId) }}</p>
                        <p class="procent">{{ veld.plannedCrops[0].growthStage }}%</p>
                        <div class="progress-bar">
                            <div class="progress" :style="{ width: veld.plannedCrops[0].growthStage + '%' }"></div>
                        </div>
                        <router-link class="btn" :to="'/veld/' + veld._id">Bekijk details</router-link>
                    </div>
                </div>
            </div>
            <Weer />
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.container {
    background-color: var(--deepSeaGreen800);
    height: 75px;
    width: 100%;
    margin-left: 0px;
}

.content {
    position: absolute;
    width: 70%;
    margin-left: 40px;
}

.card-reel {
    display: flex;
    flex-direction: column;
}

.nav {
    color: var(--offWhite);
    padding-bottom: 40px;
}

.progress-bar {
    max-width: 100%;
    height: 10px;
    background-color: var(--offBlack100);
    border-radius: 10px;
    margin-bottom: 1rem;
}

.progress {
    height: 100%;
    background-color: var(--deepSeaGreen500);
    border-radius: 10px;
}

.card {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 1em;
    margin-right: 10px;
    margin-bottom: 20px;
    position: relative;
}

.card-title {
    font-weight: bolder;
    margin-bottom: 0;
}

.procent {
    position: absolute;
    right: 1rem;
    bottom: 6rem;
}

/*  desktop */
@media (min-width: 992px) {
    .container {
        background-color: var(--offWhite);
    }

    .card-reel {
        display: flex;
        flex-direction: row;
    }

    .nav {
        padding-bottom: 10px;
    }

    .progress-bar {
        max-width: 100%;
        height: 10px;
        background-color: var(--offBlack100);
        border-radius: 10px;
    }

    .progress {
        height: 100%;
        background-color: var(--deepSeaGreen500);
        border-radius: 10px;
    }

    .card {
        max-width: 500px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 1em;
        margin-right: 10px;
    }

    .card-title {
        font-weight: bolder;
        margin-bottom: 0;
    }
}

@media (min-width: 692px) {
    .container {
        color: var(--offBlac);
        background-color: var(--offWhite);
    }

    #mapContainer {
        width: 75%;
        height: 350px;
        margin-left: 25%;
    }

    .content {
        margin-left: 25%;
        padding-left: 2rem;
        margin-top: 1rem;
    }

    .nav {
        color: var(--offBlack900);
    }

    .progress-bar {
        max-width: 100%;
        height: 10px;
        background-color: var(--offBlack100);
        border-radius: 10px;
    }

    .progress {
        height: 100%;
        background-color: var(--deepSeaGreen500);
        border-radius: 10px;
    }

    .card {
        max-width: 85%;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 1em;
        margin-right: 10px;
        margin-bottom: 20px;
    }

    .card-title {
        font-weight: bolder;
        margin-bottom: 0;
    }
}
</style>
