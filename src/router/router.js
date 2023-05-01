import { createRouter, createWebHistory } from "vue-router";
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue'

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: LogIn }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;