<script setup>
import VeldForm from '../components/VeldForm.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

let boerderijId = window.location.pathname.split("/")[2];

</script>

<template>
    <div class="content">
        <div class="arrow">
            <router-link :to="'/profiel/boerderijen/config/' + boerderijId">
                <img src="./../assets/left-arrow.svg" alt="arrow" />
            </router-link>
        </div>
        <VeldForm />
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
