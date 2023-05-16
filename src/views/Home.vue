<script setup>
import Card from '../components/Card.vue'

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

</script>

<template>
    <div class="container">
        <div class="content">
            <h1 class="title">Welkom terug, {{ firstname }}</h1>

            <p>Recent</p>
            <div class="card-reel">
                <Card />
                <Card />
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */

.content {
    position: absolute;
    top: 5%;
    margin-left: 25%;
    width: 70%;
}

.card-reel {
    display: flex;
    flex-direction: row;
}

/*  desktop */
@media (min-width: 992px) {}
</style>
