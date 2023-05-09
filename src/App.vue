<script setup>
import Nav from './components/Nav.vue'
</script>

<template>
  <!-- toon overal de nav behalve bij de login pagina en de register pagina en de map pagina -->
  <Nav v-if="$route.path !== '/login' && $route.path !== '/register' && $route.path !== '/map'" />
  <router-view></router-view>
</template>

<style scoped></style>
