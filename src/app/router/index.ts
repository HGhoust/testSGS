import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: () => import('@/pages/FormPage.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('@/pages/ResultPage.vue'),
    },
  ],
})

export default router
