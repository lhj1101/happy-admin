import { createMemoryHistory, createRouter } from 'vue-router'


const routes = [
  { 
    path: '/',
    name: 'HelloWorld',
    // component: () => import('../components/HelloWorld.vue')
    component: () => import('@/components/HelloWorld.vue')
   },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
