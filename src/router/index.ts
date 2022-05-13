import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StatisticPage from '../views/StatisticPage.vue'
import GamePage from '../views/GamePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'statistic',
    component: StatisticPage
  },
  {
    path: '/game',
    name: 'game',
    component: GamePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
