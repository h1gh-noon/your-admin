import { createApp } from 'vue'

import { createPinia } from 'pinia'

// svg
import SvgIcon from '@/components/SvgIcon.vue'
import 'virtual:svg-icons-register'

import '@/assets/main.css'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('svg-icon', SvgIcon)

app.mount('#app')
