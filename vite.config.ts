import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

//ant-design-vue按需导入
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
const AntComponents = () => Components({
  resolvers: [AntDesignVueResolver()],
})

//自动注入page
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:'0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#FBB517', //'#FBB517',
          'link-color': '#FBB517',
          'layout-header-background': '#112437',
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AntComponents(),
    Pages({
      //将什么样的文件转换成路由
      extensions: ['vue'],
      //哪个文件夹里的vue文件不需要转换成路由
      exclude: ["**/components/*.vue"],
      //接收一个路由，修改并返回修改后的路由
      extendRoute(route, parent) {

        // if (route.path === "/") {
        //   // Index is unauthenticated.
        //   return {...route,redirect:'/home'};
        // }
        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          // meta: { auth: true },
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
