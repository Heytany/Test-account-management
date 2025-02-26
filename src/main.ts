import sampleData from '@/data/sampleData'
import { useMainPageStore } from '@/stores/main'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import './styles/main.css'

const pinia = createPinia()
const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(pinia)
app.mount('#app')
//  MVP version without backend here
window.globalData = sampleData
useMainPageStore().initMainPage(window.globalData.mainPage)
