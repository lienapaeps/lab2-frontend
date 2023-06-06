<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

let velden = reactive({
    velden: []
})

let crop = ref({});

let veldId = window.location.pathname.split("/")[2];

let plannedCropsId;

function getVelden() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/fields/" + veldId, {
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
            velden.velden = json.data.field;

            plannedCropsId = json.data.field.plannedCrops[0]._id;
            // console.log(plannedCropsId);
            getCropById();
            // console.log(velden.velden)
        }).catch(err => {
            console.log(err);
        })
    }
}

function getCropById() {
    if (localStorage.getItem("token") && plannedCropsId) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/crops/" + plannedCropsId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            crop.value = json.data.crop;
            // console.log(crop.value);
            // growthStage.value = crop.value.growthStage;
        }).catch(err => {
            console.log(err);
        })
    }
}

function updatePlantingDate() {
    const data = {
        plantingDate: new Date().toISOString()
    }

    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/crops/date/" + plannedCropsId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            crop = json.data.crop;
        }).catch(err => {
            console.log(err);
        })
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

onMounted(() => {
    getVelden();
    getCropById();
})

</script>

<template>
    <div class="content">
        <div class="arrow">
            <router-link exact to="/velden">
                <img src="./../assets/left-arrow.svg" alt="arrow" />
            </router-link>
        </div>
        <h1>Overzicht</h1>

        <hr>

        <div class="alert hidden">
            Here is some feedback
        </div>

        <h2>Jouw veld</h2>
        <div id="velden">
            <div class="card-veld" v-for="veld in velden" :key="veld.id">
                <h3 id="veldnaam">{{ veld.name }}</h3>
                <div class="availability"></div>
                <span id="eigenaars" v-for="owner in veld.owner" :key="owner.id">{{ owner.name }}</span>
                <p id="grootte">{{ veld.size }} m²</p>
                <h4>Gewas:</h4>
                <span id="gewassen" v-for="crop in veld.plannedCrops" :key="crop.id">{{ crop.name }}</span>
            </div>
        </div>

        <h2>Progressie</h2>
        <div class="card-crop">
            <h4>{{ crop.name }}</h4>
            <!-- als plantingDate gelijk is aan null, toon dan een button met "planten" -->
            <div v-if="crop.plantingDate == null">
                <p>Er is nog geen progressie beschikbaar want je bent nog niet begonnen met planten.</p>
                <button @click="updatePlantingDate">Nu planten</button>
            </div>
            <!-- als plantingDate niet gelijk is aan null, toon dan de progressie -->
            <div v-else>
                <p>Je bent begonnen met planten op <b>{{ formatDate(crop.plantingDate) }}</b></p>
                <p>Geschatte oogstdatum: <b>{{ formatDate(crop.harvestDate) }}</b></p>
                <p>Je plant is al <b>{{ crop.growthStage }}%</b> gegroeid.</p>

                <div class="progress-bar">
                    <div class="progress" :style="{ width: crop.growthStage + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
a {
    color: var(--deepSeaGreen500);
}

.btn {
    color: #fff;
    margin-top: 1rem;
}

#eigenaars,
#grootte,
#gewassen {
    color: var(--offBlack500);
}

hr {
    border: 0;
    height: 1px;
    background: var(--offBlack100);
}

.card-veld {
    width: 90%;
    background-color: #fff;
    margin-right: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.content {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 8rem;
    margin-bottom: 6rem;
}

#veldnaam {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.arrow {
    position: absolute;
    top: 50px;
    left: 15px;
    z-index: 10;
}

.progress {
    height: 100%;
    background-color: var(--deepSeaGreen500);
    border-radius: 4px;
    transition: width 0.3s ease-in-out;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background-color: var(--offBlack100);
    border-radius: 4px;
}

/*  desktop */
@media (min-width: 992px) {
    .arrow {
        left: 26%;
    }
}

@media (min-width: 692px) {
    .content {
        margin-left: 25%;
        padding-left: 1rem;
    }
}
</style>