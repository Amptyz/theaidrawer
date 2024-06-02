<script setup lang="ts">
import {reactive, watch} from "vue";
import HDivider from "@/components/HDivider.vue";
import HButton from "@/components/HButton.vue";
import HFileUpload from "@/components/HFileUpload.vue";
import HImageUpload from "@/components/HImageUpload.vue";
import StyleBox from "@/views/HomeView/components/StyleBox.vue";
import SizeBox from "@/views/HomeView/components/SizeBox.vue";
const props = withDefaults(defineProps<{
  modelValue: string,
  negativePrompt: string
}>(),{

})
const data = reactive<{
  prompt:string
  negativePrompt:string
  focus:boolean
  empty:boolean
}>({
  prompt:props.modelValue,
  negativePrompt:props.negativePrompt,
  focus:false,
  empty:false
})
const emits = defineEmits(['update:modelValue','updateNegativePrompt','updateImg','updateStyle','updateSize'])

watch(
    ()=>props.modelValue,
    (val,preval)=>{
      data.prompt = val
    }
)

watch(
    () => data.prompt,
    (val, preval) => {
      emits('update:modelValue', val);
    },
    {}
)

watch(
    ()=>props.negativePrompt,
    (val,preval)=>{
      data.negativePrompt = val
    }
)

watch(
    () => data.negativePrompt,
    (val, preval) => {
      emits('updateNegativePrompt', val);
    },
    {}
)
const onFocus = () =>{
  data.focus = true
}
const onBlur = () => {
  data.focus = false
}
const updateImg = (imgUrl:string) =>{
  emits('updateImg',imgUrl)
}
const updateStyle = (styleCode:number)=>{
  emits('updateStyle',styleCode)
}
const updateSize = (x:number,y:number)=>{
  emits('updateSize',x,y)
}
</script>

<template>
  <div class="prompt-panel full flex-column">
    <div class="flex-row flex-center-vertical" >
      <div class="left-bar"></div>
      <div class="subtitle">绘画描述</div>
    </div>

    <div class="flex-row text-region ">
      <textarea class="input-field" v-model="data.prompt" placeholder="此处描述画面的关键词哦"/>
      <div class="vertical-line"></div>
      <textarea class="input-field" v-model="data.negativePrompt" placeholder="此处描写用于排除画面中的内容哦"></textarea>
    </div>

    <div style="width: 98%" class="horizontal-line"></div>

    <div class="setting-panel">

      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">绘画风格</div>
      </div>
      <div class="style-box">
        <StyleBox @updateStyle="updateStyle"></StyleBox>
      </div>


      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">生图尺寸</div>
      </div>
      <div class="style-box">
        <SizeBox @updateSize="updateSize"></SizeBox>
      </div>

      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">图例上传</div>
      </div>
      <div style="height: 200px">
        <HImageUpload @updateImg="updateImg"></HImageUpload>
      </div>
    </div>

    <slot></slot>




  </div>
</template>

<style scoped lang="stylus">
.text-region
  width 100%
  height 20%
.prompt-panel
  flex 1
  position relative

  background-color var(--grey-color-dark)
  border-radius 16px
  border 2px solid var(--grey-color)
  &:focus-within
    border 2px solid var(--theme-color)
    transition 0.3s
.input-field
  box-sizing border-box
  padding 10px 10px
  width 100%
  height 100%
  font-size 16px
  color var(--font-subject-color)

.setting-panel
  height 100%
  flex 2
//.icon-generate
//  width 150px
//  position: absolute
//  right 0
//  bottom 0
//  cursor pointer
//  font-size 30px
//  color var(--theme-color-bright)
//  margin-right 10px
//  margin-bottom 5px
//  &:hover
//    color var(--accent-color-dark)


.style-box
  width 100%
  margin 10px
</style>