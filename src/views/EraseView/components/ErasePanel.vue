<script setup lang="ts">

import HScroller from "@/components/HScroller.vue";
import HSwitch from "@/components/HSwitch.vue";
import ImageOptionPanel from "@/views/DrawView/components/ImageOptionPanel.vue";
import SizeBox from "@/views/DrawView/components/SizeBox.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import HImageUpload from "@/components/HImageUpload.vue";
import StyleBox from "@/views/DrawView/components/StyleBox.vue";
import HFormInput from "@/components/HFormInput.vue";
import {reactive} from "vue";
import HButton from "@/components/HButton.vue";
import UploadBase64 from "@/components/UploadBase64.vue";
const data = reactive<{
  image:string|null
  mask:string|null
  maskPrompt:string|null
  maskNegativePrompt:string|null
  rect:{
    left:number|null
    top:number|null
    right:number|null
    bottom:number|null
  }
  syncInvoke:boolean
}>({
  image:null,
  mask:null,
  maskPrompt:'',
  maskNegativePrompt:'',
  rect:{
    left:0.25,
    top:0.25,
    right:0.75,
    bottom:0.75,
  },
  syncInvoke:true
})
defineExpose({
  data
})

const updateImg = (imgUrl:string) =>{
  console.log('图片url',imgUrl)
  data.image = imgUrl
}
const updateMask = (mask:string)=>{
  console.log('图片蒙版base64',mask)
  data.mask = mask
}
</script>

<template>
  <div class="prompt-panel full flex-column">
    <HScroller scroll-direction="column">
      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">绘画描述</div>
      </div>
      <div class="flex-row text-region ">
        <textarea class="input-field" v-model="data.maskPrompt" placeholder="此处输入擦除内容描述哦"/>
        <div class="vertical-line"></div>
        <textarea class="input-field" v-model="data.maskNegativePrompt" placeholder="此处输入不用擦除描述哦"></textarea>
      </div>

      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">图片上传</div>
      </div>
      <div style="height: 200px">
        <HImageUpload @updateImg="updateImg"></HImageUpload>
      </div>

      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">蒙版图片</div>
      </div>
      <div style="height: 200px">
        <UploadBase64 @updateBase64="updateMask"></UploadBase64>
      </div>
    </HScroller>
  </div>

</template>

<style scoped lang="stylus">
.text-region
  width 100%
  height 150px
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
  margin-top 15px
  height 100%
  flex 2
.style-box
  width 100%
  margin 10px

.icon-erase
  width 150px
  position: absolute
  right 20px
  bottom 5px
  cursor pointer
  font-size 30px
  color var(--theme-color-bright)
  margin-right 10px
  margin-bottom 5px
  &:hover
    color var(--accent-color-dark)
</style>