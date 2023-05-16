<script setup>
import SearchBar from './../components/SearchBar.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Overzicht velden</h1>
            <div class="search">
                <SearchBar />
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.container {
    background-color: var(--deepSeaGreen800);
    height: 120px;
    width: 100%;
    margin-left: 0px;
}

h1 {
    color: var(--offWhite);
}

.content {
    position: absolute;
    width: 80%;
    margin-left: 40px;
}

/*  desktop */
@media (min-width: 992px) {
    .container {
        background-color: var(--offWhite);
        margin-left: 20px;
    }

    h1 {
        color: var(--offBlack900);
    }
}

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
        width: 65%;
    }
}
</style>