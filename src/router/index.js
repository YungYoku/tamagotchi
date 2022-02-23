import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/reg",
      name: "registration",
      component: () => import("../views/RegistrationView.vue"),
      meta: {
        auth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        auth: false,
      },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/Page404.vue"),
      meta: {
        auth: false,
      },
    },
  ],
});

router.resolve({
  name: "404",
  params: { pathMatch: ["404"] },
}).href;

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;
  const logged = localStorage.uid;

  if (logged) {
    if (requireAuth) {
      next();
    } else {
      next("/");
    }
  } else {
    if (requireAuth) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
