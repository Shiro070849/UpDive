import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../views/UploadView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation Guard - ป้องกันการเข้าถึงหน้าที่ต้อง login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth

  // ถ้าหน้านั้นต้องการ authentication
  if (requiresAuth && !token) {
    // ถ้าไม่มี token ให้ไปหน้า login
    next('/login')
  }
  // ถ้ามี token แล้วพยายามเข้าหน้า login/register
  else if (!requiresAuth && token && (to.path === '/login' || to.path === '/register')) {
    // ให้ไปหน้า home แทน
    next('/')
  }
  else {
    // อนุญาตให้ผ่าน
    next()
  }
})

export default router
