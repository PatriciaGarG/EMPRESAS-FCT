import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import AlumnDataPage from '../pages/AlumnDataPage.vue'



const routes = [

  {path: '/', component: LoginPage},
  {path: '/register', component: RegisterPage},
  {path: '/alumn/:id', component: AlumnDataPage},
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router