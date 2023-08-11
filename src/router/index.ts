import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import Landing from '@/views/LandingView.vue';
import Dashboard from '@/layouts/Dashboard.vue';
import HomePage from '@/views/HomePage.vue'
import BanAppeal from '@/views/BanAppeal.vue';
// import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'DashboardHome',
          redirect: 'dashboard/home',
        },
        {
          path: 'home',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: 'appeals',
          name: 'BanAppeal',
          component: BanAppeal
        },
      ],
    },
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: NotFound
    // },
  ]
})

router.beforeEach(() => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const userStore = useUserStore() // eslint-disable-line
})

export default router
