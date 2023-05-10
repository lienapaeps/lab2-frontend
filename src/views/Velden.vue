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
    top: 5%;
    margin-left: 25%;
    width: 70%;
}

/*  desktop */
@media (min-width: 992px) {}
</style>