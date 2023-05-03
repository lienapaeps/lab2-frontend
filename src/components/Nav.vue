<script setup>
import router from '../router/router';
</script>

<template>
    <nav>
        <div class="nav__menu">
            <img class="logo__nav" src="src/assets/EmblemWhite.svg" alt="">
            <div class="nav__item" active-class="active">
            <router-link exact to="/home">Home</router-link>
            </div>
            <div class="nav__item" active-class="active">
            <router-link exact to="/videos">Video's</router-link>
            </div>
            <div class="nav__item" active-class="active">
            <router-link exact to="/velden">Velden</router-link>
            </div>
            <div class="nav__item" active-class="active">
            <router-link exact to="/inbox">Inbox</router-link>
            </div>
            <div class="nav__item" active-class="active">
            <router-link exact to="/profiel">Profiel</router-link>
            </div>
        </div>
    </nav>
    <component :is="currentView" />
</template>

<style scoped>
/*  mobile */
nav {
    width: 30%;
    height: 100%;
    background-color: var(--deepSeaGreen800);
    overflow: hidden;
    position: fixed;
    z-index: -1;
}
.nav__menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}

.nav__item {
    text-align: center;
    color: var(--offWhite);
    margin: 10px;
    padding: 10px;
}

.active{
    display: flex;
    background-color: var(--offWhite);
    color: var(--deepSeaGreen800);
    padding: 10px 40px;
    border-radius: 10px;
    font-weight: bold;
}

.logo__nav {
    width: 15%;
    margin-top: 20px;
    margin-bottom: 80px;
}

/* Desktop */
@media (min-width: 992px) {}
</style>
