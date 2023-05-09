<script setup>
</script>

<template>
    <div class="searchbar">
        <div class="searchIcon">
            <img src="./../assets/SearchEmblem.svg" alt="search">
        </div>
        <a class="search" href="./../map.html">Zoeken naar boerderijen</a>
    </div>
</template>

<style scoped>
/*  mobile */
.searchIcon {
    color: var(--offBlack900);
    opacity: 0.5;
}

.searchbar {
    background-color: #fff;
    text-align: left;
    padding: 1rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(1, 1, 1, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
}

a.search {
    color: var(--offBlack900);
}

/*  desktop */
@media (min-width: 992px) {}
</style>