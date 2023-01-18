import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import DailyShop from '../pages/DayliShop.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/daily-shop',
        component: DailyShop,
        name: '每日商店',
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
