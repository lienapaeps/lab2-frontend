<script setup>
import router from '../router/router';
//when click on button, remove nav
window.onload = function () {
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const navitem = document.querySelectorAll('.nav__item');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav__menu--hidden');
        burger.classList.toggle('burger--active');
        console.log('test');
    });
    navitem.forEach((item) => {
        item.addEventListener('click', () => {
            nav.classList.toggle('nav__menu--hidden');
            burger.classList.toggle('burger--active');
        });
    });

}

</script>

<template>
    <img class="burger" src="../assets/Hamburger.svg" alt="menu">
    <img class="logo__nav" src="/EmblemWhite.svg" alt="">
    <nav>
        <div class="nav__menu">
            <div class="nav__item">
                <img class="emblem" src="/HomeEmblem.svg" alt="home">
                <router-link exact to="/">Home</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="/VideosEmblem.svg" alt="videos">
                <router-link exact to="/videos">Video's</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="/VeldenEmblem.svg" alt="velden">
                <router-link exact to="/velden">Velden</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="/MailEmblem.svg" alt="inbox">
                <router-link exact to="/inbox">Inbox</router-link>
            </div>
            <div class="nav__item">
                <img class="emblem" src="/ProfileEmblem.svg" alt="profile">
                <router-link exact to="/profiel">Profiel</router-link>
            </div>
        </div>
    </nav>
    <component :is="currentView" />
</template>

<style scoped>
/*  mobile */
nav {
    float: left;
    height: 100%;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: var(--deepSeaGreen800);
    overflow: hidden;
    position: fixed;
    opacity: 0;
    z-index: -99;
    font-size: 2rem;
}

.nav__menu--hidden {
    opacity: 1;
    z-index: 99;
}

.burger {
    position: absolute;
    top: 70px;
    right: 40px;
    z-index: 100;
    width: 30px;
    margin: 10px;
    cursor: pointer;
    filter: brightness(0) saturate(100%)invert(99%) sepia(1%) saturate(7485%) hue-rotate(173deg) brightness(127%) contrast(95%);
}

.test {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: red;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
}

.nav__menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    margin-left: 0px;
    padding-left: 25%;
    width: 100%;
}

.nav__item {
    display: flex;
    align-items: center;
    color: var(--offWhite);
    margin: 1rem;
}

.active {
    background-color: var(--offWhite);
    color: var(--deepSeaGreen800);
    padding: 10px 30px;
    border-radius: 10px;
    font-weight: bold;
}

.emblem {
    width: 32px;
    margin-right: 1.5rem;
    filter: brightness(0) saturate(100%) invert(99%) sepia(1%) saturate(7485%) hue-rotate(173deg) brightness(127%) contrast(95%);
}

.active .emblem {
    width: 32px;
    margin-right: 1rem;
    filter: brightness(0) saturate(100%) invert(29%) sepia(18%) saturate(2138%) hue-rotate(118deg) brightness(90%) contrast(94%);
}

.logo__nav {
    position: absolute;
    top: 60px;
    left: 11%;
    width: 40px;
    z-index: 100;
    opacity: 0;
}

.hamburger .bar,
.hamburger::before,
.hamburger::after {
    content: '';
    display: block;
    width: 100%;
    height: 5px;
    background-color: #000;
    margin: 6px 0;
    transition: 0.4s;
    border-radius: 40px;
    z-index: 100;
}


/* Desktop */
@media (min-width: 992px) {}

@media (min-width: 692px) {
    nav {
        width: 25%;
        float: left;
        height: 100%;
        bottom: 0;
        left: 0;
        background-color: var(--deepSeaGreen800);
        overflow: hidden;
        position: fixed;
        z-index: 1;
        opacity: 1;
        font-size: 1.2rem;
    }

    .test {
        opacity: 0;
    }

    .nav__menu--hidden {
        opacity: 1;
    }

    .burger {
        opacity: 0;
    }

    .emblem {
        width: 24px;
    }

    .active .emblem {
        width: 24px;
    }

    .logo__nav {
        opacity: 1;
        position: fixed;
    }
}
</style>
