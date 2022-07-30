// import Home from '@/views/home/index.vue'
import useAdminTabs from '@/modules/adminTabs/useAdminTabs'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


const adminTabs = useAdminTabs()
router.beforeEach(async (to, from) => {
  if (to.fullPath.startsWith('/admin')) {
    await adminTabs.add(to.fullPath)
  }


  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
})

export default router
