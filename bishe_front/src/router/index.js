import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginRegister')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category')
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import('../views/Tag')
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetail')
  },
  {
    path: '/user/:username',
    name: 'UserCenter',
    component: () => import('../views/UserCenter')
  },
  {
    path: '/article/create',
    name: 'ArticleCreate',
    component: () => import('../views/ArticleCreate')
  },
  {
    path: '/article/edit/:id',
    name: 'ArticleEdit',
    component: () => import('../views/ArticleEdit')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
