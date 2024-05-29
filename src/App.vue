<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted} from "vue";
import {changeTheme} from "@/assets/api";
import SideBar from "@/views/SideBar/SideBar.vue";

onMounted(()=>{
  changeTheme("bright")
})
</script>

<template>

  <div class="main-div flex-row border-radius-regular ">
    <SideBar></SideBar>
    <div class="main-view">
      <router-view v-slot="{Component}">
        <transition
          name="animate__animated animate__fade"
          enter-active-class="animate__fadeIn"
          leave-active-class="animate__fadeOut"
          mode="out-in"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>

  </div>

</template>

<style lang="stylus">
@import "assets/themes/mixin.styl"
@import "assets/styles/index.css"
@import "assets/font/index.css"

@import "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
#app
  font-family Readex Pro
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  theme_color()

body
  margin: 0
  user-select none
  border-radius 16px

.main-div
  position absolute
  width 100%
  height 100%
  overflow hidden
  margin 0 5px
  //background-color var(--black-background)

.main-view
  height 100%
  width 100%
  //background-color var(--black-background)
  overflow hidden
</style>

