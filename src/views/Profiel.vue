<script setup>
import ProfielCard from '../components/ProfielCard.vue';
import router from '../router/router';


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
</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Profiel</h1>
            <div class="profile">
                <p>Profiel wijzigen</p>
            </div>
            <div class="instellingen">
                <h2>Instellingen</h2>
                <ProfielCard text="Mijn gewassen" src="veld.svg" router="/" />
                <ProfielCard text="Privacy" src="lock.svg" router="/" />
                <ProfielCard text="Meldingen" src="bell.svg" router="/" />
            </div>
            <div class="verhuren">
                <h2>Verhuren</h2>
                <ProfielCard text="Verhuur mijn veld" src="verhuren.svg" router="/profiel/boerderijen" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.container {
    display: flex;
    flex-direction: column;
}

.content {
    position: absolute;
    top: 5%;
    margin-left: 25%;
    width: 70%;
}

.left {
    display: flex;
    align-items: center;
    gap: 2rem;
}


/*  desktop */
@media (min-width: 992px) {}
</style>