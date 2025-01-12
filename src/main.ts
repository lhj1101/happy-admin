import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/styles/index.scss'
import moment from './utils/moment/index'

const app = createApp(App)
const pinia = createPinia()

// 全局配置momentjs
app.config.globalProperties.$moment = moment

app.use(router)
   .use(pinia)

app.mount('#app')
