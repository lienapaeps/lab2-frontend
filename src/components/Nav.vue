<script setup>
import router from '../router/router';
</script>

<template>
    <nav>
        <div class="nav__menu">
            <router-link exact to="/home">Home</router-link>
            <router-link exact to="/videos">Video's</router-link>
            <router-link exact to="/velden">Velden</router-link>
            <router-link exact to="/inbox">Inbox</router-link>
            <router-link exact to="/profiel">Profiel</router-link>
        </div>
    </nav>
    <component :is="currentView" />
</template>

<style scoped>
/*  mobile */
nav {
    width: 100%;
    background-color: red;
}

/* Desktop */
@media (min-width: 992px) {}
</style>
