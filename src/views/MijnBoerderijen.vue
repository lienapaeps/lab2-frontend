<script setup>
import { reactive, onMounted } from 'vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

// get user id from token in localstorage
const token = localStorage.getItem('token');
const base64Url = token.split('.')[1];
const base64 = base64Url.replace('-', '+').replace('_', '/');
const user = JSON.parse(window.atob(base64));
// console.log(user.uid);

let userId = user.uid;

let boerderijen = reactive({
    boerderijen: []
})

function getBoerderijen() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/farms/user/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            // console.log(json.data);
            boerderijen.boerderijen = json.data.farms;
            // console.log(boerderijen.boerderijen)
        }).catch(err => {
            console.log(err);
        })
    }
}

onMounted(() => {
    getBoerderijen();
})

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Verhuren</h1>
            <h2>Mijn boerderijen</h2>
            <div class="boerderijen">
                <!-- als er nog geen boerderijen zijn: -->
                <p v-if="boerderijen.boerderijen.length === 0">Je hebt nog geen boerderijen toegevoegd.</p>
                <!-- als er wel boerderijen zijn: -->
                <div v-for="boerderij in boerderijen.boerderijen" :key="boerderij.id">
                    <h3>{{ boerderij.name }}</h3>
                    <p>{{ boerderij.street }} {{ boerderij.streetnumber }}, {{ boerderij.postalcode }} {{ boerderij.city }}
                    </p>
                    <br>
                    <router-link :to="'/boerderij/' + boerderij._id">Bekijk boerderij</router-link>
                </div>
            </div>
            <router-link class="add" exact to="/addBoerderij">Boerderij toevoegen</router-link>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
a {
    color: var(--offBlack900);
}

a.add {
    background-color: var(--deepSeaGreen800);
    padding: 1rem 2rem;
    border-radius: 10px;
    color: #fff;
}

.container {
    display: flex;
    flex-direction: column;
}

.content {
    margin-left: 25%;
    padding-left: 1rem;
    margin-top: 1rem;
    width: 65%;
}

.boerderijen div {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: .5rem 1rem;
    border-radius: 10px;
}

.boerderijen {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
}

/*  desktop */
@media (min-width: 992px) {}
</style>