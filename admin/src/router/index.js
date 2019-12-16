import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [    
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [{
      path: '/category/create',
      name: 'create',
      component: () => import('../views/CategoryEdit.vue')
    },{
      path: '/category/list',
      name: 'list',
      component: () => import('../views/CategoryList.vue')
    }]
  },

]

const router = new VueRouter({
  routes
})

export default router
