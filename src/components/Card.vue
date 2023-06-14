<script setup>
import { ref, reactive, onMounted } from 'vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

// get id from token in localstorage
const token = localStorage.getItem('token');
const base64Url = token.split('.')[1];
const base64 = base64Url.replace('-', '+').replace('_', '/');
const user = JSON.parse(window.atob(base64));

let userId = user.uid;

let velden = reactive({
    velden: []
})

let farmId;

let cropId;

let crop = ref({});

let boerderijen = reactive({
    boerderijen: []
})

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
            // console.log(velden);

            farmId = velden.velden[0].farmId;

            cropId = velden.velden[0].plannedCrops[0]._id;
            // console.log(cropId);

            getFarmById();
            getCropById();

            // console.log(farmId);
        }).catch(err => {
            console.log(err);
        })
    }
}

function getFarmById() {
    if (localStorage.getItem("token")) {
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
            // console.log(json);

            boerderijen.boerderijen = json.data;

        }).catch(err => {
            console.log(err);
        })
    }
}

function getCropById() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/crops/" + cropId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            crop.value = json.data.crop;

        }).catch(err => {
            console.log(err);
        })
    }
}

onMounted(() => {
    getVeldByUserId();
    getFarmById();
    getCropById();
})

</script>

<template>
    <div class="card" v-for="veld in  velden.velden " :key="veld.id">
        <div class="card-body">
            <p class="card-title" v-for="boerderij in boerderijen.boerderijen" :key="boerderij.id">Boerderij {{
                boerderij.name }}</p>
            <p>{{ veld.name }}</p>
            <p class="card-text">{{ crop.name }} - {{ crop.growthStage }}%</p>
            <div class="progress-bar">
                <div class="progress" :style="{ width: crop.growthStage + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
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

@media (min-width: 692px) {
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

/*  desktop */
@media (min-width: 992px) {

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
</style>