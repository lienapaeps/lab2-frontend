<script setup>
import { onMounted, reactive } from 'vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

// get field id from url
let veldId = window.location.pathname.split("/")[2];
// console.log(fieldId);

let velden = reactive({
    velden: []
})

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
            // console.log(velden.velden)
        }).catch(err => {
            console.log(err);
        })
    }
}

function hireField() {
    // get crop id and name from selected radio button
    let cropId = document.querySelector('input[name="crop"]:checked').value;
    // console.log(cropId);

    fetch("https://plant-en-pluk.onrender.com/api/v1/fields/" + veldId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        mode: "cors",
        body: JSON.stringify({ cropId: cropId })
    })
        .then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            window.location.href = "/velden";
        }).catch(err => {
            console.log(err);
        })
}

onMounted(() => {
    getVelden();
})

</script>

<template>
    <div class="content">
        <h1>Overzicht</h1>

        <div id="hire">
            <h2>Veld huren</h2>

            <h3>Je gekozen veld: </h3>
            <div class="card-veld" v-for="veld in velden" :key="veld.id">
                <h3 id="veldnaam">{{ veld.name }}</h3>
                <p id="grootte">{{ veld.size }} m²</p>
            </div>

            <h3>Welk gewas wil je graag planten?</h3>
            <div class="card-crops">
                <ul>
                    <li v-for="crop in velden.velden.crops" :key="crop._id">
                        <label>
                            <input name="crop" type="radio" :value="crop._id">
                            {{ crop.name }}
                        </label>
                    </li>
                </ul>
            </div>

            <a class="btn" @click="hireField">Nu huren</a>
        </div>

    </div>
</template>

<style scoped>
/*  mobile */
.content {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 1rem;
}

.form {
    width: 100%;
}

h1 {
    margin-left: 4rem;
    margin-top: -4rem;
    margin-bottom: 6rem;
    color: var(--offWhite);
}

li {
    list-style-type: none;
}

.card-veld {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
}

/*  desktop */
@media (min-width: 992px) {
    .content {
        margin-left: 25%;
        padding-left: 2rem;
        margin-top: 4rem;
        margin-bottom: 2rem;
    }

    h1 {
        margin-left: 0;
        margin-top: 0;
        margin-bottom: 0;
        color: var(--offBlack900);
    }
}
</style>