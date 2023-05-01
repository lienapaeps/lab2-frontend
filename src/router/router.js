import { createRouter, createWebHistory } from "vue-router";
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: "/home", component: Home },
  { path: "/login", component: LogIn },
  { path: "/registreer", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;