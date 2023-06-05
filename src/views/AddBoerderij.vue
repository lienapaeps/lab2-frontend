<script setup>
import BoerderijForm from '../components/BoerderijForm.vue';
import VeldForm from '../components/VeldForm.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="content">
        <div class="arrow">
            <router-link exact to="/profiel/mijn-boerderijen">
                <img src="./../assets/left-arrow.svg" alt="arrow" />
            </router-link>
        </div>
        <BoerderijForm />
    </div>
    <!-- <VeldForm /> -->
</template>

<style scoped>
/*  mobile */

.content {
    margin-top: 2rem;
}

a {
    color: var(--offBlack900);
    margin-left: 2rem;
}

/*  desktop */
@media (min-width: 992px) {
    .arrow {
        margin-left: 25%;
    }
}
</style>
