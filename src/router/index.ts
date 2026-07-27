import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import UUIDGenerator from '../pages/UUIDGenerator.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/uuid',
    component: UUIDGenerator,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
