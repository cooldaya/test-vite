import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/big-screen/page1/index.vue";
import AboutView from "@/views/big-screen/page2/index.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
