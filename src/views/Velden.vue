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
    display: flex;
    flex-direction: column;
}

.content {
    position: absolute;
    width: 90%;
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
        width: 65%;
    }
}
</style>