import { createRouter, createWebHistory } from "vue-router";
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Videos from '../views/Videos.vue';
import Velden from '../views/Velden.vue';
import Inbox from '../views/Inbox.vue';
import Profiel from '../views/Profiel.vue';
import Map from '../views/Map.vue';
import Boerderij from '../views/Boerderij.vue';
import Veld from '../views/Veld.vue';
import AddBoerderij from '../views/AddBoerderij.vue';
import MijnBoerderijen from '../views/MijnBoerderijen.vue';
import ConfigBoerderij from '../views/ConfigBoerderij.vue';
import AddVeld from '../views/AddVeld.vue';
import HuurVeld from '../views/HuurVeld.vue';

const routes = [
  { path: "/", component: Home },
  { path: "/videos", component: Videos },
  { path: "/login", component: LogIn },
  { path: "/velden", component: Velden },
  { path: "/inbox", component: Inbox },
  { path: "/profiel", component: Profiel },
  { path: "/registreer", component: Register },
  { path: "/map", component: Map },
  { path: "/boerderij/:id", component: Boerderij },
  { path: "/veld/:id", component: Veld },
  { path: "/addBoerderij", component: AddBoerderij },
  { path: "/profiel/boerderijen", component: MijnBoerderijen },
  { path: "/profiel/boerderijen/config/:id", component: ConfigBoerderij },
  { path: "/addVeld/:id", component: AddVeld },
  { path: "/huur-veld/:id", component: HuurVeld },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;