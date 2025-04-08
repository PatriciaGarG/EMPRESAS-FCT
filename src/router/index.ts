import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import CompanyInformationPage from '../pages/companyInformationPage.vue'

const routes = [

  {path: '/', component: LoginPage},
  {path: '/company/:id',name: 'CompanyInformation', component: CompanyInformationPage, props: true},
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router