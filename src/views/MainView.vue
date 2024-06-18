<script setup lang="ts">

</script>

<template>
  <div class="full" style="background-color: var(--black-background)">
      <router-view v-slot="{Component}">
        <keep-alive>
        <component :is="Component"></component>
        </keep-alive>
      </router-view>
  </div>
</template>

<style scoped lang="stylus">

</style>