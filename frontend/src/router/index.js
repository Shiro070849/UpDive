import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../views/UploadView.vue'

const routes = [
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
