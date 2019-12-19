import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [    
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [{
      path: '/categories/create',
      name: 'categoriesCreate',
      component: () => import('../views/CategoryEdit.vue')
    },{
      path: '/categories/edit/:id',
      name: 'categoriesEdit',
      props:true,
      component: () => import('../views/CategoryEdit.vue')
    },{
      path: '/categories/list',
      name: 'categoriesList',
      component: () => import('../views/CategoryList.vue')
    },{
      path: '/items/create',
      name: 'itemsCreate',
      component: () => import('../views/ItemEdit.vue')
    },{
      path: '/items/edit/:id',
      name: 'itemsEdit',
      props:true,
      component: () => import('../views/ItemEdit.vue')
    },{
      path: '/items/list',
      name: 'itemsList',
      component: () => import('../views/ItemList.vue')
    },{
      path: '/heroes/create',
      name: 'heroesCreate',
      component: () => import('../views/HeroEdit.vue')
    },{
      path: '/heroes/edit/:id',
      name: 'heroesEdit',
      props:true,
      component: () => import('../views/HeroEdit.vue')
    },{
      path: '/heroes/list',
      name: 'heroesList',
      component: () => import('../views/HeroList.vue')
    },{
      path: '/articles/create',
      name: 'articlesCreate',
      component: () => import('../views/ArticleEdit.vue')
    },{
      path: '/articles/edit/:id',
      name: 'articlesEdit',
      props:true,
      component: () => import('../views/ArticleEdit.vue')
    },{
      path: '/articles/list',
      name: 'articlesList',
      component: () => import('../views/ArticleList.vue')
    },{
      path: '/ads/create',
      name: 'adsCreate',
      component: () => import('../views/AdEdit.vue')
    },{
      path: '/ads/edit/:id',
      name: 'adsEdit',
      props:true,
      component: () => import('../views/AdEdit.vue')
    },{
      path: '/ads/list',
      name: 'adsList',
      component: () => import('../views/AdList.vue')
    }]
  },

]

const router = new VueRouter({
  routes
})

export default router
