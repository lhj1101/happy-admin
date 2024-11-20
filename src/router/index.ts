import { createMemoryHistory, createRouter } from 'vue-router'


const routes = [
  { 
    path: '/',
    name: 'HelloWorld',
    // component: () => import('../components/HelloWorld.vue')
    component: () => import('@/components/HelloWorld.vue')
   },
   { path: '/:pathMatch(.*)*', component: () => import('@/components/404.vue') }  // 确保有一个404页面
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
