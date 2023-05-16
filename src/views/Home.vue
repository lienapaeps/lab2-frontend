<script setup>
import Card from '../components/Card.vue'

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <h1 class="title">Welkom terug, Bert</h1>

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
    width: 70%;
}

.card-reel {
    display: flex;
    flex-direction: row;
}

/*  desktop */
@media (min-width: 992px) {}

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
