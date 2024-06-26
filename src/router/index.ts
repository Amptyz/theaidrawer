import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import LoginView from "@/views/SignView/LoginView.vue";
import SignView from "@/views/SignView/SignView.vue"
import RegistryView from "@/views/SignView/RegistryView.vue";
import MainView from "@/views/MainView.vue";
import DrawView from "@/views/DrawView/DrawView.vue";
import TalkView from "@/views/TalkView/TalkView.vue"
import EraseView from "@/views/EraseView/EraseView.vue";
import ProfileView from "@/views/ProfileView/ProfileView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/sign',
      name:'sign',
      component:SignView,
      redirect:'/login',
      children:[
        {
          path:'/login',
          name:'login',
          component:LoginView
        },
        {
          path:'/registry',
          name:'registry',
          component: RegistryView
        }
      ]
    },
    {
      path:'/main',
      name:'main',
      component: MainView,
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'home',
          component:HomeView,
        },
        {
          path:'/draw',
          name:'draw',
          component: DrawView,
        },
        {
          path:'/talk',
          name:'talk',
          component: TalkView
        },
        {
          path:'/erase',
          name:'erase',
          component: EraseView
        },
        {
          path:'/profile',
          name:'profile',
          component: ProfileView
        }
      ]
    },


  ]
})

export default router
