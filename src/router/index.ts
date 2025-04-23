import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import AlumnDataPage from '../pages/AlumnDataPage.vue';
import AlumnDashboardPage from '../pages/AlumnDashboardPage.vue';
import CompanyDashboardPage from '../pages/CompanyDashboardPage.vue';
import CompanyInformationPage from '../pages/companyInformationPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/alumn/:id', component: AlumnDataPage },
  { path: '/dashboard/alumn', component: AlumnDashboardPage },
  { path: '/dashboard/company', component: CompanyDashboardPage },
  { path: '/company/:id', component: CompanyInformationPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
