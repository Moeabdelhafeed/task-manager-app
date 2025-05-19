import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        requiresAuth: true
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta:{
        requiresAuth: false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        requiresAuth: false
      },
    }
  ]
})


router.beforeEach(async (to) => {
  const  authStore = useAuthStore();
  await authStore.getUser()
  authStore.errors = {};

  if(authStore.user  && to.meta.requiresAuth == false){
    return router.push('/');
  }

  if(!authStore.user && to.meta.requiresAuth == true){
    return router.push('/login');
  }
})
export default router
