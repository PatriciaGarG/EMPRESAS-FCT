import { createRouter, createWebHistory } from 'vue-router';

import DashboardPage from '../pages/DashboardPage.vue';
import LoginPage from '../pages/LoginPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: DashboardPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
