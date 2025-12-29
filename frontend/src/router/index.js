import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../views/UploadView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'upload',
    component: UploadView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
