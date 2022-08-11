
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './styles/common.scss'


import 'ant-design-vue/dist/antd.less'


import Markdown from 'vue3-markdown-it';
import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
import 'highlight.js/styles/monokai.css';





const app = createApp(App)
app.use(Markdown);
app.use(createPinia())
app.use(router)




app.mount('#app')
