import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Layouts
import DashboardLayout from '../layouts/DashboardLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

// Auth Pages
import LoginPage from '../views/auth/LoginPage.vue'
import SignupPage from '../views/auth/SignupPage.vue'

// Dashboard Pages
import DashboardHome from '../views/dashboard/DashboardHome.vue'
import Contacts from '../views/dashboard/Contacts.vue'
import Meetings from '../views/dashboard/Meetings.vue'
import Emails from '../views/dashboard/Emails.vue'
import Pipeline from '../views/dashboard/Pipeline.vue'
import Help from '../views/dashboard/Help.vue'
import Settings from '../views/dashboard/Settings.vue' // ✅ Make sure this file exists

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
      },
      {
        path: 'signup',
        name: 'Signup',
        component: SignupPage,
      },
    ],
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardHome,
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: Contacts,
      },
      {
        path: 'meetings',
        name: 'Meetings',
        component: Meetings,
      },
      {
        path: 'emails',
        name: 'Emails',
        component: Emails,
      },
      {
        path: 'pipeline',
        name: 'Pipeline',
        component: Pipeline,
      },
      {
        path: 'help',
        name: 'Help',
        component: Help,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
