<template>
  <div
      class="image-main"
      :style="{
          width: props.fix === 'width' ? size + 'px' : size / image.height * image.width + 'px',
          height: props.fix === 'height' ? size + 'px' : size / image.width * image.height + 'px'
        }"
      :class="{'loaded' : data.loaded}"
  >
    <transition
        name="animate__animated animate__fade"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
        mode="out-in"
    >
      <div class="loading-block" v-if="!data.loaded">
        <div class="center">
          <div class="spinner1" style="background-color: var(--theme-color)"></div>
        </div>
      </div>
    </transition>

    <div class="image-block">
      <img @load="onLoad" alt="" :src="props.image.src">
    </div>
  </div>


</template>

<script setup lang="ts">
import {defineProps, defineEmits, reactive, onMounted} from 'vue'
import {Image} from "@/assets/api/type";
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<{
  image: Image
  fix?: 'width'|'height'
  size?: number
  lazyLoad?: boolean
}>(),{
  fix: 'width',
  size: 100,
  lazyLoad: true
})

const data = reactive<{
  loaded: boolean
}>({
  loaded: false
})

const emits = defineEmits(['load','error'])

const onLoad = () => {
  data.loaded = true
  emits('load')
}

onMounted(() => {
  data.loaded = !props.lazyLoad
})

</script>

<style scoped lang="stylus">
.image-main
  display inline-block
  width auto
  height auto
  position relative
  scale 1.2

.image-block
  width 100%
  height 100%
  transition all 0.3s ease
  img
    width 100%
    height 100%
  img[src=''],
  img:not([src])
    opacity 0

.loaded
  animation fade 0.5s, shrink 0.5s

.loading-block
  position absolute
  background-color var(--background-color)
  width 100%
  height 100%

.flex-container
  display flex
  flex-direction column
  justify-content flex-end
</style>
