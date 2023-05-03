<script setup>
import Nav from './components/Nav.vue'
</script>

<template>
  <Nav v-if="$route.path !== '/login' && $route.path !== '/registreer'" />
  <router-view></router-view>
</template>

<style scoped></style>
