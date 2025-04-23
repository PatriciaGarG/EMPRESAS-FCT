import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import AlumnDataPage from '../pages/AlumnDataPage.vue';
import AlumnDashboardPage from '../pages/AlumnDashboardPage.vue';
import CompanyDashboardPage from '../pages/CompanyDashboardPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/alumn/:id', component: AlumnDataPage },
  //{ path: '/company/:id', component: CompanyDataPage },
  { path: '/dashboard/', component: AlumnDashboardPage },
  { path: '/dashboard/alumn', component: AlumnDashboardPage },
  { path: '/dashboard/company', component: CompanyDashboardPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
