<script setup>
import BoerderijForm from '../components/BoerderijForm.vue';
import VeldForm from '../components/VeldForm.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <BoerderijForm />
    <!-- <VeldForm /> -->
</template>

<style scoped>
/*  mobile */

/*  desktop */
@media (min-width: 992px) {}
</style>
