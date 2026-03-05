import { createRouter, createWebHistory } from "vue-router";
import AuthService from "@/services/authService";

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
  {
    path: "/v2",
    name: "LandingPage",
    component: () => import("@/pages/landing-page.vue"),
  },
  {
    path: "/areaRestrita",
    name: "AreaRestrita",
    component: () => import("@/pages/areaRestrita.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/pages/dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: () => import("@/components/dashboardHome.vue"),
      },
      {
        path: "calendar",
        name: "CalendarPage",
        component: () => import("@/components/calendarPage.vue"),
      },
      {
        path: "anamnese",
        name: "AnamneseList",
        component: () => import("@/components/anamneseList.vue"),
      },
      {
        path: "financial",
        name: "FinancialPage",
        component: () => import("@/components/financialPage.vue"),
      }
    ]
  },
  {
    path: "/anamnese",
    name: "AnamnesePage",
    component: () => import("@/pages/anamnesePage.vue"),
  },
];

// Crie o roteador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard: protege todas as rotas que exigem autenticação
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !AuthService.isAuthenticated()) {
    next({ name: "AreaRestrita" });
  } else {
    next();
  }
});

export default router;