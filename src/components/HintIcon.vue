<script setup lang="ts">
import {reactive} from "vue";

const props = defineProps<{
  title:string
  content:string
}>()
const state = reactive<{
  isShowHint:boolean
}>({
  isShowHint:false
})
const onMouseEnter = ()=>{
  state.isShowHint = true
}
const onMouseLeave = () => {
  state.isShowHint = false
}
</script>

<template>
  <div>
    <i class='bx bx-info-circle hint-icon' @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div class="hint-panel" v-show="state.isShowHint">
          <div class="flex-row flex-center-vertical" >
            <i class='bx bx-info-circle hint-icon' style="margin: 0 5px;color: #D6B6FF"></i>
            <div class="hint-title">{{props.title}}</div>
          </div>
          <div class="hint-text">
            {{props.content}}
          </div>

        </div>
      </transition>
    </i>
  </div>
</template>

<style scoped lang="stylus">
.hint-icon
  color #7C839C
  font-size 18px
  position relative
  top 2px
  cursor pointer

  .hint-panel
    z-index 9999
    transition 0.1s
    border-radius 8px
    background-color var(--black-color)
    position absolute
    top -6px
    left 0
    width 300px
    height auto
    box-shadow 2px 2px 2px #D6B6FF
    border 1px solid #D6B6FF
    .hint-title
      font-size: 18px;
      color: var(--white-color);
      font-weight: 600;
      text-align: left;
      margin: 5px 6px;
    .hint-text
      color #7C839C
      font-size 14px

      text-align left
      margin 12px 30px
  //.hint-panel::after
  //  content ''
  //  position absolute
  //  top  3px
  //  left -16px
  //  border 10px solid
  //  border-color transparent var(--black-color) transparent transparent



</style>