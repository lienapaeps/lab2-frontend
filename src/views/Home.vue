<script setup>
import Card from '../components/Card.vue'

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Welkom terug, Bert</h1>

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
