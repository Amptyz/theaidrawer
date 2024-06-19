<script setup lang="ts">

import {computed, onMounted, reactive, ref, watch} from "vue";
import {c} from "vite/dist/node/types.d-aGj9QkWt";
import HFormInput from "@/components/HFormInput.vue";

const props = withDefaults(defineProps<{
  name:string
  modelValue: number
  max?:number
  min?:number
  step?:number
  width?:number
}>(),{
  max:3,
  min:1,
  step:1,
  width:100
})
const emits = defineEmits(['update:modelValue'])
const data = reactive<{
  sliderLeft:number
  value:number
}>({
  value:props.modelValue,
  sliderLeft:props.width*(props.modelValue-props.min)/(props.max-props.min)
})
watch(
    ()=>props.modelValue,
    (val,preval)=>{
      data.value = val
    }
)
watch(
    ()=>data.value,
    (val,preval)=>{
      emits('update:modelValue',val)
    }
)
// const bar = ref()
// const slider = ref()
// const mask = ref()
// const isClickSlider = ref(false)
// const countNewValue = (left:number) =>{
//   console.log('min',props.min)
//   console.log('max',props.max)
//   console.log('left',left)
//   console.log('width',props.width)
//   console.log('value',props.min+left/props.width)
//   data.value = Math.round(props.min+left/props.width*(props.max-props.min))
//   if(props.step==0.1){
//     data.value=Math.round(props.min+left/props.width*(props.max-props.min)*10)/10
//   }
//   data.sliderLeft = props.width*(data.value-props.min)/(props.max-props.min)
// }
// let left
// onMounted(()=>{
//   //添加监听事件
//   mask.value.onmousedown = (e)=>{
//     if(e.target.className=='slider'){
//       return
//     }
//     left = e.offsetX
//     if(left<=0){
//       left = 0
//     }else if(left>props.width){
//       left = props.width
//     }
//     countNewValue(left)
//     isClickSlider.value = true
//   }
//   slider.value.onmousedown = e =>{
//     isClickSlider.value = true
//   }
//   mask.value.onmousemove = e=>{
//     if(isClickSlider.value){
//       let tempLeft
//       if(e.target.className=='slider')
//       tempLeft = left-12+e.offsetX
//       else
//         tempLeft = e.offsetX
//         if(tempLeft>=0&&tempLeft<=props.width){
//           left = tempLeft
//           countNewValue(left)
//         }
//
//     }
//   }
//   mask.value.onmouseup=()=>{
//     isClickSlider.value = false
//   }
//   mask.value.onmouseleave=()=>{
//     isClickSlider.value = false
//   }
// })
//
const maskWidth = computed(()=>{
  return{
    width:`${props.width}px`
  }
})
// const barWidth = computed(()=>{
//   return{
//     width:`${data.sliderLeft}px`
//   }
// })
</script>

<template>
  <div class="progress-bar flex-row">
    <div class="num">
      {{data.value}}
    </div>
    <div style="position: relative;color:white;line-height: 24px" class="text-bold">
      {{props.name}}
    </div>
    <div style="position: relative;margin-left: 16px" :style="maskWidth">
      <input type="range" :min="props.min" :max="props.max" :step="props.step" v-model="data.value" :width="props.width">
      <div class="input-bg"></div>
    </div>
  </div>



</template>

<style scoped lang="stylus">
//* {
//  -webkit-user-select: none;
//  -moz-user-select: none;
//  -ms-user-select: none;
//  user-select: none;
//}
.progress-bar
  position relative
  text-align left
  height 24px
  width 100%

.mask
  height 20%
  background-color var(--grey-color-bright)
  border-radius 10px
  position absolute
  bottom 40%
  cursor pointer

.bar
  height 100%
  background-color var(--theme-color-bright)
  position absolute
  z-index 2
  border-radius 11px

.slider
  position absolute
  right -12px
  width 18px
  height 18px
  border-radius 50%
  bottom -7px
  z-index 3
  background-color white
.slider:hover
   box-shadow #7C839C 2px 2px 5px
   transition 0.2s
.num
  position absolute
  line-height 24px
  right 0
  color white
  text-align right
  //padding-bottom 20px
.input-bg
  background var(--grey-color-bright)
  height 3px
  border-radius 24px
  position absolute
  left 2px
  width 98%
  top 45%
  z-index 1
[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  //background:-webkit-linear-gradient(var(--theme-color-bright),var(--grey-color-bright))
  //background-size: 75% 100%

  background transparent

}

[type="range"]::-webkit-slider-runnable-track{


}

/* 定义range控件容器的样式 */
[type="range" i]::-webkit-slider-container {
  height 20px
  overflow hidden
}

/* 定义range控件拇指的样式 */
[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  position: relative
  z-index 10
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid transparent;
  /* 使用border-image属性给拇指添加渐变边框 */
  border-image: linear-gradient(#C43188, #9B456A) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
}
</style>