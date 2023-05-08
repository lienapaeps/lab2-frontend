<script setup>
import SearchBar from './../components/SearchBar.vue';

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
    /* overflow: hidden; */
    padding: 1rem;
    margin-left: 30%;
}

/*  desktop */
@media (min-width: 992px) {}
</style>