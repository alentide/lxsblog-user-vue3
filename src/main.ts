import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './styles/common.scss'


import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib



const app = createApp(App)


import Markdown from 'vue3-markdown-it';
app.use(Markdown);
import 'highlight.js/styles/monokai.css';






app.use(createPinia())
app.use(router)

app.mount('#app')
