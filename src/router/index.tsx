import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
