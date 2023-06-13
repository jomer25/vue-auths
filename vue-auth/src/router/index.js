import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/users/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/users/SignupView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if(to.meta.requiresAuth && !window.user) {
    return {
      path: '/login'
    }
  }
})

export default router