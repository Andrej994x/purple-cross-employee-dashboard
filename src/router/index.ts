import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/employees" },
    {
      path: "/employees",
      component: () => import("@/pages/EmployeesPage.vue"),
    },
  ],
});

export default router;
