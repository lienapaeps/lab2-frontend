<script setup>
import VeldForm from '../components/VeldForm.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <VeldForm />
</template>

<style scoped>
/*  mobile */

/*  desktop */
@media (min-width: 992px) {}
</style>
