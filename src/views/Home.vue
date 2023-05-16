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
            <div class="nav">
                <h1 class="title">Welkom terug, {{ firstname }}</h1>
            </div>

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
}
</style>
