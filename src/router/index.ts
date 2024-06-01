import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import DriverView from '@/views/DriverView.vue'
import RequestView from '@/views/RequestView.vue'
import CarView from '@/views/CarView.vue'
import UserView from '@/views/UserView.vue'
import ProgramationView from '@/views/ProgramationView.vue'
import GroupView from '@/views/GroupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/home/driver',
          name: 'driver',
          component: DriverView
        },
        {
          path: '/home/request',
          name: 'request',
          component: RequestView
        },
        {
          path: '/home/car',
          name: 'car',
          component: CarView
        },
        {
          path: '/home/user',
          name: 'user',
          component: UserView
        },
        {
          path: '/home/programation',
          name: 'programation',
          component: ProgramationView
        },
        {
          path: '/home/group',
          name: 'group',
          component: GroupView
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
