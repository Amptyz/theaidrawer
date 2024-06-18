<script setup lang="ts">
import {reactive, watch} from "vue";
import HDivider from "@/components/HDivider.vue";
import HButton from "@/components/HButton.vue";
import HFileUpload from "@/components/HFileUpload.vue";
import HImageUpload from "@/components/HImageUpload.vue";
import StyleBox from "@/views/DrawView/components/StyleBox.vue";
import SizeBox from "@/views/DrawView/components/SizeBox.vue";
import ProgressBar from "@/components/ProgressBar.vue";

const data = reactive<{

  hrScale:number
  focus:boolean
  empty:boolean
}>({

  hrScale:15,
  focus:false,
  empty:false
})
const emits = defineEmits(['updateImg','updateStyle','updateSize'])

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


    <div class="setting-panel">

      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">图例上传</div>
      </div>
      <div style="height: 200px">
        <HImageUpload @updateImg="updateImg"></HImageUpload>
      </div>

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
        <div class="subtitle">其它参数</div>
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

.style-box
  width 100%
  margin 10px
</style>