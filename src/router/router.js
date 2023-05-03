import { createRouter, createWebHistory } from "vue-router";
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Videos from '../views/Videos.vue';

const routes = [
  { path: "/home", component: Home },
  { path: "/videos", component: Videos },
  { path: "/login", component: LogIn },
  { path: "/registreer", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
});

export default router;