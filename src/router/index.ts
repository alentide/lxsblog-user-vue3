// import Home from '@/views/home/index.vue'
import useAdminTabs from '@/modules/adminTabs/useAdminTabs'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import routes from '~pages'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {

    console.log('savedPosition',savedPosition);
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})


const isAddPage = () => {
  console.log('window.history', window.history.state, window.history.state.forward);
  return !window.history.state.forward
}



const refreshNextPage = (to: RouteLocationNormalized) => {
  to.meta.keepAlive = false
}

const keepAliveNextPage = (to: RouteLocationNormalized) => {
  to.meta.keepAlive = true
}

const adminTabs = useAdminTabs()
router.beforeEach(async (to, from) => {
  if (to.fullPath.startsWith('/admin')) {
    await adminTabs.add(to.fullPath)
  }


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
