<script>
export default {
  name:"SignView"
}
</script>

<script setup lang="ts">

</script>

<template>
  <div  class="full main-panel flex-column">
    <router-view v-slot="{ Component }">
      <transition
          name="animate__animated animate__fade"
          enter-active-class="animate__fadeInRight"
          leave-active-class="animate__fadeOutRight"
          mode="out-in"
      >
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="stylus">
.main-panel
  height 100%
  --animate-duration 0.5s
  align-items center
  div
    margin 10px 0


</style>