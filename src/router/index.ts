/// <reference types="vite-plugin-pages/client" />
// import Home from '@/views/home/index.vue'
import useAdminTabs from '@/modules/adminTabs/useAdminTabs'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import routes from '~pages'
import useToast from '@/modules/toast/useToast';
import { auth } from '@/modules/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {

  
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})


const isAddPage = () => {
  return !window.history.state.forward
}



const refreshNextPage = (to: RouteLocationNormalized) => {
  to.meta.keepAlive = false
}

const keepAliveNextPage = (to: RouteLocationNormalized) => {
  to.meta.keepAlive = true
}

const adminTabs = useAdminTabs()
const toast = useToast()
router.beforeEach(async (to, from,next) => {

  console.log('to',to);
  if (to.fullPath.startsWith('/admin')) {
    await adminTabs.add(to.fullPath)
  }

  if(to.path.startsWith('/admin') && auth.user?.type !=='admin'){

    console.log('user.user',auth.user);
    toast.error('你不是管理员！')
    return next('/user/article')
  }
  next()


  // window.scrollTo({
  //   left: 0,
  //   top: 0,
  //   behavior: 'smooth'
  // })
})

// router.afterEach((to, from) => {
//   if (isAddPage()) {
//     refreshNextPage(to)
//   } else {
//     keepAliveNextPage(to)
//   }
// })

export default router
