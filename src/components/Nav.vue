<script setup>
import router from '../router/router';

//add classlist active to current view
document.querySelectorAll(".nav__item").forEach((ele) =>
    ele.addEventListener("click", function (event) {
        event.preventDefault();
        document
            .querySelectorAll(".nav__item")
            .forEach((ele) => ele.classList.remove("active"));
        this.classList.add("active")
    })
);




</script>

<template>
    <nav>
        <div class="nav__menu">
            <img class="logo__nav" src="src/assets/EmblemWhite.svg" alt="">
            <div class="nav__item">
                <img class="emblem" src="src/assets/HomeEmblem.svg" alt="home">
                <router-link exact to="/">Home</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="src/assets/VideosEmblem.svg" alt="videos">
                <router-link exact to="/videos">Video's</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="src/assets/VeldenEmblem.svg" alt="velden">
                <router-link exact to="/velden">Velden</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="src/assets/MailEmblem.svg" alt="inbox">
                <router-link exact to="/inbox">Inbox</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="src/assets/ProfileEmblem.svg" alt="profile">
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
    bottom: 0;
    left: 0;
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
    display: flex;
    align-items: center;
    color: var(--offWhite);
    margin: 16px;
}

.active {
    background-color: var(--offWhite);
    color: var(--deepSeaGreen800);
    padding: 10px 30px;
    border-radius: 10px;
    font-weight: bold;
}

.emblem {
    width: 20px;
    margin-right: 6px;
    filter: brightness(0) saturate(100%)invert(99%) sepia(1%) saturate(7485%) hue-rotate(173deg) brightness(127%) contrast(95%);
}

.active .emblem {
    width: 20px;
    margin-right: 6px;
    filter: brightness(0) saturate(100%) invert(29%) sepia(18%) saturate(2138%) hue-rotate(118deg) brightness(90%) contrast(94%);

}

.logo__nav {
    width: 15%;
    margin-top: 20px;
    margin-bottom: 80px;
}


/* Desktop */
@media (min-width: 992px) {}
</style>
