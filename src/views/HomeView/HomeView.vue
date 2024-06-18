<script setup lang="ts">

import HButton from "@/components/HButton.vue";
import {goDraw} from "@/assets/api";
</script>

<template>
  <div class="full flex-column" style="background-color: black">
    <div class="home-panel">
      <div class="bg-block">
      </div>
      <div class="advertise-block">
        <div class="ad-title">
          <span class="gradual-change">
            AI
          </span>
          绘画
        </div>
        <div class="ad-subtitle">
          把你的想象带到画板和屏幕之上叭
        </div>
        <div class="ad-text">
          基于Stable Difusion的新一代ai技术，<br>
          体验效果极佳的ai绘画叭
        </div>
        <div class="ad-button-block">
          <div class="ad-button">
            <HButton class="ad-button" @click="goDraw">
              <i class='bx bxs-palette' ></i>
              开始绘画
            </HButton>
          </div>

        </div>
      </div>
    </div>
    <div class="divid-bar flex-row flex-center">
      <div class="divid-bar-text">
        <i class='bx bxs-palette' ></i>
        其它工具
        <i class='bx bx-chevron-down' ></i>
      </div>
    </div>
    <div class="other-panel">

    </div>




  </div>
</template>

<style scoped lang="stylus">
.home-panel
  position relative
  margin 80px 30px 0 5px
  width 96%
  height 500px
  border-radius 12px
  //background-color var(--grey-color)
.bg-block
  position absolute
  width 100%
  height 100%
  background url("@/assets/Images/home-bg.png") no-repeat 80%
  background-size 880px

.advertise-block
  position absolute
  z-index 1
  text-align left
  width 50%
  margin-top 50px
  margin-left 10%
  div
    margin-top 18px
  .ad-title
    font-size 50px
    color: var(--white-color);
    font-weight: 600;
  .gradual-change
    -webkit-text-fill-color transparent
    background linear-gradient(90deg,#C43188,#D6B6FF)
    -webkit-background-clip text
  .ad-subtitle
    font-size 32px
    color: var(--white-color);
    font-weight: 600;
  .ad-text
    font-size 14px
    color: var(--white-color);
    font-weight: 600;
  .ad-button-block
    margin-top 30px
    .ad-button
      margin 0
      width 220px
      font-size 20px
      font-weight 600
.divid-bar
  margin-top 20px
  height 56px
  background-color #151515
  .divid-bar-text
    font-size 20px
    color #7C839C
    font-weight 600;


</style>
