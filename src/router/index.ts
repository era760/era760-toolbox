import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import UUIDGenerator from '../pages/UUIDGenerator.vue'
import ManifestGenerator from '../pages/ManifestGenerator.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/uuid',
    component: UUIDGenerator,
  },
  {
    path: '/manifest',
    component: ManifestGenerator,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
