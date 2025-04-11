import { createRouter, createWebHistory } from "vue-router";

// Defina suas rotas
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/landind-page.vue"),
  },
  {
    path: "/e-book-release",
    name: "EbookRelease",
    component: () => import("@/pages/lp-ebook.vue"),
  },
];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;