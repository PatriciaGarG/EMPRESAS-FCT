<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import CompanyInformationPage from '../pages/companyInformationPage.vue'

const routes = [

  {path: '/', component: LoginPage},
  {path: '/company/:id',name: 'CompanyInformation', component: CompanyInformationPage, props: true},
  
]
=======
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import AlumnDataPage from '../pages/AlumnDataPage.vue';
import AlumnDashboardPage from '../pages/AlumnDashboardPage.vue';
import CompanyInformationPage from '../pages/companyInformationPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/alumn/:id', component: AlumnDataPage },
  { path: '/dashboard', component: AlumnDashboardPage },
  { path: '/company/:id', component: CompanyInformationPage },
];
>>>>>>> main
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
