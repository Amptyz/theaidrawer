import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import LoginView from "@/views/SignView/LoginView.vue";
import SignView from "@/views/SignView/SignView.vue"
import RegistryView from "@/views/SignView/RegistryView.vue";
import MainView from "@/views/MainView.vue";
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
      ]
    },


  ]
})

export default router
