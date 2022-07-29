// import Home from '@/views/home/index.vue'
import useAdminTabs from '@/modules/adminTabs/useAdminTabs'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home
  //   },
  //   {
  //     path: '/articles',
  //     name: 'articles',
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/articles/index.vue')
  //   }
  //   // {
  //   //   path: '/about',
  //   //   name: 'about',
  //   //   // route level code-splitting
  //   //   // this generates a separate chunk (About.[hash].js) for this route
  //   //   // which is lazy-loaded when the route is visited.
  //   //   component: () => import('../views/AboutView.vue')
  //   // }
  // ]
})


const adminTabs = useAdminTabs()
router.beforeEach((to, from) => {
  if (to.fullPath.startsWith('/admin')) {
    adminTabs.add(to.fullPath)
  }


  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
})

export default router
