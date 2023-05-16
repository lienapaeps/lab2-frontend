<script setup>
import ProfielCard from '../components/ProfielCard.vue';
import router from '../router/router';


if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
    window.location.reload()
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
            <router-link @click="logOut()" exact to="/">
                <div class="logout">
                    <img src="/logout.svg" alt="Log uit icoon">
                    <p>Uitloggen</p>
                </div>
            </router-link>
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

h1,
.profile {
    color: var(--offWhite);
}

.content {
    position: absolute;
    width: 80%;
    margin-left: 40px;
}

.left {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.instellingen {
    margin-top: 4rem;
}

.logout {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}

.logout p {
    color: var(--semanticRed);
}

/*  desktop */
@media (min-width: 992px) {
    .container {
        background-color: var(--offWhite);
    }

    h1,
    .profile {
        color: var(--offBlack900);
    }

    .content {
        margin-left: 26%;
        padding-left: 1rem;
        margin-top: 1rem;
        width: 65%;
    }
}
</style>