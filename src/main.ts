import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'



const app = createApp(App)


import Markdown from 'vue3-markdown-it';
app.use(Markdown);
import 'highlight.js/styles/monokai.css';



app.use(createPinia())
app.use(router)

app.mount('#app')
