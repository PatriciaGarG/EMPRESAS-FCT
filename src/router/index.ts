import { createRouter, createWebHistory } from 'vue-router';

import DashboardPage from '../pages/AlumnDashboardPage.vue';
import LoginPage from '../pages/LoginPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/alumnos', component: DashboardPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
