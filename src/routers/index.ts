import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/home-page/index.vue') },
  {
    path: '/workflow',
    component: () => import('@/pages/workflow/index.vue'),
  },
  {
    path: '/form-builder',
    component: () => import('@/pages/form-builder/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
