import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import AlumnDataPage from '../pages/AlumnDataPage.vue';
import AlumnDashboardPage from '../pages/AlumnDashboardPage.vue';
import CompanyInformationPage from '../pages/companyInformationPage.vue';
import CompanyDashboardPage from '../pages/companyDashboardPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/alumn/:id', component: AlumnDataPage },
  { path: '/dashboard', component: AlumnDashboardPage },
  { path: '/company/:id', component: CompanyInformationPage },
  { path: '/dashboard/companies', component: CompanyDashboardPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
