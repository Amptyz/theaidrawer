<template>
  <div
      class="sidebar-main "
      ref="sidebarRef"
      :class="{'locked': !store.state.online, 'unlock-unfolded': store.state.online && !store.state.sidebar_fold, 'unlock-folded': store.state.online && store.state.sidebar_fold}"
  >
    <transition
      name="animate__animated animate__fade"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
      mode="out-in"
    >
      <div v-if="!store.state.online" class="locked-sidebar ">
        <div class="locked-sidebar-background full ">
          <div class="video-cover">
            <video loop autoplay muted playsinline style="width: 100%;height: 100%;object-fit: cover">
              <source src="@/assets/videos/welcomeVideo.webm">
            </video>
          </div>

          <div class="text-on-video ">
            <h1>
              Everything you imagine,
              <br>
              make anything you have.
            </h1>

          </div>
        </div>
      </div>

      <div v-else class="unlocked-sidebar flex-column">
        <div class="sidebar-top-block">
          <div class="icon-app-name-flex flex-row" @click="switchFold">

            <div class="title-inverse foldable" style="flex-grow: 0; text-align: center">AiDraw</div>
          </div>
          <side-bar-item-group v-if="!store.state.isAdmin">
            <side-bar-item name="study" @click="goto('/home')">
              <div class="flex-row" style="justify-content: center; transition: gap 0.5s" :style="{gap: store.state.sidebar_fold?'0':'20px'}">
                <div class="box-icon">
                  <i class='bx bx-book'></i>
                </div>
                <div class="foldable">Home</div>
              </div>
            </side-bar-item>
            <side-bar-item name="archive" @click="goto('/draw')">
              <div class="flex-row" style="justify-content: center; transition: gap 0.5s" :style="{gap: store.state.sidebar_fold?'0':'20px'}">
                <div class="box-icon">
                  <i class='bx bx-archive'></i>
                </div>
                <div class="foldable">Draw</div>
              </div>
            </side-bar-item>


          </side-bar-item-group>
        </div>
        <div class="sidebar-bottom-block border-radius-regular">
          <div class="avatar-bar flex-row">
            <HAvatar></HAvatar>
            <div style="text-align: left">
              <div class="text-inverse foldable">{{ store.state.nick_name }}</div>
              <div class="hint foldable" style="font-size: 10px">{{ store.state.email }}</div>
            </div>
          </div>
<!--          <div style="margin: 0 10px;height: 1.5px; background-color: var(&#45;&#45;theme-color)"></div>-->
          <transition
              name="animate__animated animate__fade"
              enter-active-class="animate__fadeIn"
              leave-active-class="animate__fadeOut"
              mode="out-in"
          >
            <div v-if="!store.state.sidebar_fold" class="function-bar flex-row" style="color: var(--grey-color-bright)">
              <div class="flex-row button-hover-inverse" style="gap: 5px" @click="onEdit">
                <div class="box-icon" style="font-size: 15px">
                  <i class='bx bx-edit' ></i>
                </div>
                <div class="foldable-small" style="font-size: 11px">编辑</div>
              </div>
              <div class="flex-row button-hover-inverse" style="gap: 5px"  @click="onSignOut">
                <div class="box-icon">
                  <i class='bx bx-exit' style="font-size: 15px"></i>
                </div>
                <div class="foldable-small" style="font-size: 11px">登出</div>
              </div>
            </div>
            <div v-else class="function-bar-column flex-column" style="gap: 20px; padding: 10px 0">
              <div class="button-hover-inverse" @click="onEdit">
                <div class="box-icon" style="font-size: 16px">
                  <i class='bx bx-edit' ></i>
                </div>
              </div>
              <div class="button-hover-inverse" @click="onSignOut">
                <div class="box-icon" style="font-size: 16px">
                  <i class='bx bx-exit' ></i>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import HIcon from "@/components/HIcon.vue";
import SideBarItem from "@/views/SideBar/SideBarItem.vue"
import store from "@/store"
import {signOut, goto} from "@/assets/api";
import SideBarItemGroup from "@/views/SideBar/SideBarItemGroup.vue";
import HAvatar from "@/components/HAvatar.vue";

const switchFold = () => {
  store.state.sidebar_fold = !store.state.sidebar_fold
}

const onEdit = () =>{

  store.state.sidebar_fold = true
}
const onSignOut = () => {
  signOut();
}
</script>

<style scoped lang="stylus">
.locked
  width 60%
  bottom 0
  left 0
  height 100%

.unlock-folded
  width 100px
  bottom 20px
  left -20px
  height calc(100% + 40px)
  .foldable
    width 0
    opacity 0
    flex-grow 0
  .foldable-small
    width 0
    opacity 0
    flex-grow 0
  .sidebar-bottom-block
    background-color var(--theme-color)
    height 150px
  .avatar-bar
    margin 0
    left -5px

.unlock-unfolded
  width 250px
  bottom 20px
  left -20px
  height calc(100% + 40px)

.foldable
  white-space nowrap
  width 100px
  text-align left
  flex-grow 1
  transition flex-grow 1s, opacity 0.5s, width 1s

.foldable-small
  width 45px
  text-align left
  flex-grow 1
  transition flex-grow 1s, opacity 0.5s, width 1s
  white-space nowrap

.sidebar-main

  transition all 0.5s, width 1s
  border-radius 0 0 10px 10px
  --animate-duration 0.5s
  overflow hidden
  flex-shrink 0

.locked-sidebar
  height 100%

.locked-sidebar-background
  overflow hidden
  background #000000
  display flex
  flex-direction column
  justify-content center
  position relative
  text-align center


.unlocked-sidebar
  height 100%
  background-color var(--grey-color-dark)
  color var(--font-inverse-color)
  justify-content space-between
  padding-top 10px
  box-sizing border-box

.sidebar-top-block
  width 100%

.sidebar-bottom-block
  margin 60px 15px
  padding 5px
  height 100px

  //background-color rgba(0, 0, 0, 0.2)
  background-color var(--grey-color-dark)
  transition all 0.5s, height 1s

.icon-app-name-flex
  position relative
  padding-top 30px
  padding-bottom 80px
  justify-content center
  transition all 0.5s

.avatar-bar
  position relative
  margin 0 10px;
  justify-content left
  left 0
  transition all 0.5s

.function-bar
  height 30px
  padding-bottom 5px
  width 100%
  box-sizing border-box
  justify-content center
  gap 20px
  .box-icon
    width fit-content

.video-cover
  height 100%
  opacity 0.9
  overflow hidden
  position absolute
.text-on-video
  position relative
  font-size 22px
  color white
</style>
