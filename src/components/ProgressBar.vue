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
const bar = ref()
const slider = ref()
const mask = ref()
const isClickSlider = ref(false)
const countNewValue = (left:number) =>{
  console.log('min',props.min)
  console.log('max',props.max)
  console.log('left',left)
  console.log('width',props.width)
  console.log('value',props.min+left/props.width)
  data.value = Math.round(props.min+left/props.width*(props.max-props.min))
  if(props.step==0.1){
    data.value=Math.round(props.min+left/props.width*(props.max-props.min)*10)/10
  }
  data.sliderLeft = props.width*(data.value-props.min)/(props.max-props.min)
}
let left
onMounted(()=>{
  //添加监听事件
  mask.value.onmousedown = (e)=>{
    if(e.target.className=='slider'){
      return
    }
    left = e.offsetX
    if(left<=0){
      left = 0
    }else if(left>props.width){
      left = props.width
    }
    countNewValue(left)
    isClickSlider.value = true
  }
  slider.value.onmousedown = e =>{
    isClickSlider.value = true
  }
  mask.value.onmousemove = e=>{
    if(isClickSlider.value){
      let tempLeft
      if(e.target.className=='slider')
      tempLeft = left-12+e.offsetX
      else
        tempLeft = e.offsetX
        if(tempLeft>=0&&tempLeft<=props.width){
          left = tempLeft
          countNewValue(left)
        }

    }
  }
  mask.value.onmouseup=()=>{
    isClickSlider.value = false
  }
  mask.value.onmouseleave=()=>{
    isClickSlider.value = false
  }
})

const maskWidth = computed(()=>{
  return{
    width:`${props.width}px`
  }
})
const barWidth = computed(()=>{
  return{
    width:`${data.sliderLeft}px`
  }
})
</script>

<template>
  <div class="progress-bar flex-row">
    <div class="num">
      {{data.value}}
    </div>
    <div style="position: relative;color:white;line-height: 24px" class="text-bold">
      {{props.name}}
    </div>
    <div style="position: relative;margin-left: 16px">
      <div class="mask" ref="mask" :style="maskWidth">
        <div class="bar" ref="bar" :style="barWidth">
          <div class="slider" ref="slider">
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped lang="stylus">
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
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

</style>