<template>
  <div
      class="border-radius-thin"
      :class="[props.type,props.static]"

      :style="{
        height: props.height === '' ? '40px' : props.height,
      }"
  >
    <div class="center">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import{defineProps, withDefaults} from 'vue'
const props = withDefaults(defineProps<{
  type?: 'primary'|'danger'|'secondary'
  size?: string
  height?: string
  static?: string
}>(),{
  type: "primary",
  static: "h-button"
});
</script>

<style scoped lang="stylus">
.static-button
  width 100%
  height 40px
  position relative
  margin: 20px 0
  font-size 14px
  transition background-color 0.1s
  cursor pointer
  border-radius 8px
.h-button
  width 100%
  height 40px
  position relative
  margin: 20px 0
  font-size 14px
  transition background-color 0.1s
  cursor pointer
  border-radius 8px
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
.h-button::before{
  position: absolute;
  content: '';
  left: -2em;
  right: -2em;
  top: -2em;
  bottom: -2em;
  pointer-events: none;
  transition: ease-in-out .5s;
  background-repeat: no-repeat;
  background-image: radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%),
      radial-gradient(circle, var(--theme-color-bright) 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%,
      15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
      83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
  animation: bubbles ease-in-out .75s forwards;
}
.h-button:active {
  transform: scale(0.95);
  background-color: var(--theme-color-bright)
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
}
.h-button:active::before {
  animation: none;
  background-size: 0;
}
.primary
  background-color var(--theme-color)
  color var(--font-inverse-color)
  &:hover
    background-color var(--theme-color-bright)

.danger
  background-color var(--accent-color)
  color var(--font-inverse-color)
  &:hover
    background-color var(--accent-color-dark)

.secondary
  background-color var(--grey-color-bright)
  color var(--black-color)
  &:hover
    background-color var(--grey-color)
</style>
