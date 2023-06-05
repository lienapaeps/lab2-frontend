<script setup>
import HuurVeldForm from '../components/HuurVeldForm.vue'

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <div class="arrow">
                <router-link exact to="/map">
                    <img src="./../assets/left-arrow.svg" alt="arrow" />
                </router-link>
            </div>
            <HuurVeldForm />
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.container {
    background-color: var(--deepSeaGreen800);
    height: 75px;
    width: 100%;
    margin-left: 0px;
}

a {
    color: var(--offBlack900);
    margin-left: 2rem;
}

.arrow {
    margin-top: 1rem;
}

/*  desktop */
@media (min-width: 992px) {
    .container {
        background-color: var(--offWhite);
    }

    .arrow {
        margin-left: 25%;
    }
}
</style>
