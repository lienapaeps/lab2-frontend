<script setup>
import Card from '../components/Card.vue'
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


/*  desktop */
@media (min-width: 692px) {
    .content{
    position: absolute;
    top: 5%;
    margin-left: 25%;
    width: 70%;
}
.card-reel{
    display: flex;
    flex-direction: row;
}
}

@media (max-width: 992px) {
.card-reel{
    display: flex;
    flex-direction: column;
}
}

</style>
