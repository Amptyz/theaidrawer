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
        name="animate__animated animate__fade"
      >
        <div class="hint-panel" v-if="state.isShowHint">
          <div class="hint-title">
            {{props.title}}
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
  transition 0.3s
  cursor pointer
  &:hover
    color #9B456A
  .hint-panel
    border-radius 8px
    background-color rgb(27,27,28)
    position absolute
    width 300px
    height auto
    transition 0.3s
</style>