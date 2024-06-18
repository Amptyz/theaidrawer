<script setup lang="ts">

import PrompPanel from "@/views/DrawView/components/PrompPanel.vue";
import {reactive, ref} from "vue";
import {draw} from "@/assets/api";
import type {drawRequest, ImgOption} from "@/assets/api/type";
import ImageGeneration from "@/views/DrawView/components/ImageGeneration.vue";
import HButton from "@/components/HButton.vue";
const advancedOption = reactive<ImgOption>({
  removeBackground:null,
  redrawBackground:null,
  genderDetect:null,
  facePreservation:null,
  facePreservationCount:null,
  img:null,
})
const paras = reactive<drawRequest>({
  prompt:'',
  negativePrompt:'',
  modelStyleId:1,
  width:960,
  height:960,
  img:null,
  maskImg:null,
  maskBlur:null,
  denoisingStrength:null,
  hrScale:null,
  hrSteps:null,
  seed:null,
  tiling:null,
  faceFix:null,
  detailsLevel:null,
  imgOptions:advancedOption
})
const data = reactive<{
  taskId:string
}>({
  taskId:''
})
const drawImg = () =>{
  console.log('drawImg',paras)
  draw(paras).then(res=>{
    data.taskId=res.data;
    console.log('检查taskId',data.taskId)

  })
}
const onFinishDraw = () => {
  data.taskId = ''
}
const updateNegativePrompt = (val) =>{
  paras.negativePrompt = val
}
const updateImg = (imgUrl:string)=>{
  console.log('成功update了Img！！')
  paras.img = imgUrl
  if(imgUrl==''){
    paras.imgOptions={}
  }
}
const updateStyle = (styleCode:number)=>{
  paras.modelStyleId = styleCode
  console.log('成功update模型参数！！',paras.modelStyleId)
}
const updateSize = (x:number,y:number)=>{
  paras.height = paras.width*y/x;
  if(y===16){
    paras.height = 960
    paras.width = 720
  }
  console.log('成功update图片尺寸！！',paras.width,paras.height)
}
const updateHrScale = (val:number)=>{
  paras.hrScale = val
  console.log('成功update了scale',paras.hrScale)
}
const updateHrStep = (val:number)=>{
  paras.hrStep = val
  console.log('成功update了step',paras.hrScale)
}
const updateDetailLevel = (val:number)=>{
  paras.detailsLevel = val
  console.log('成功update了detailLevel',paras.hrScale)
}
const updateFaceFix = (val:boolean)=>{
  paras.faceFix = val
  console.log('成功update了Facefix',paras.faceFix)
}
const updateTilling = (val:boolean)=>{
  paras.tiling = val
  console.log('成功update了tiling',paras.tiling)
}
const updateSeed = (val:string)=>{
  paras.seed = val
  console.log('成功update了tiling',paras.seed)
}
const updateImgOption = (option)=>{
  paras.imgOptions = option
  console.log('成功update了imgOptions',paras.imgOptions)
}
const updateDenoisingStrength = (val)=>{
  paras.denoisingStrength = val
  console.log('成功update了重回幅度',paras.denoisingStrength)
}
</script>

<template>
  <div class="full flex-row" style="background-color: var(--black-background)">

    <div class="prompt-div">
      <PrompPanel v-model="paras.prompt" :negative-prompt="paras.negativePrompt"
                  @updateImg="updateImg"
                  @updateStyle="updateStyle"
                  @updateSize="updateSize"
                  @updateHrScale="updateHrScale"
                  @updateHrStep="updateHrStep"
                  @updateDetailLevel="updateDetailLevel"
                  @updateFaceFix="updateFaceFix"
                  @updateTilling="updateTilling"
                  @updateSeed="updateSeed"
                  @updateDenoisingStrength="updateDenoisingStrength"
                  @updateImgOption="updateImgOption"
                  @updateNegativePrompt="updateNegativePrompt">
      </PrompPanel>

    </div>

    <div class="pic-div">
      <ImageGeneration :taskId="data.taskId" @onFinishDraw="onFinishDraw"></ImageGeneration>
    </div>
    <div class="icon-generate">
      <HButton  @click="drawImg">
        <div class="flex-row full">
          <i class='bx bxs-magic-wand' style="font-size: 30px"></i>
          <div style="font-size: 18px;font-weight: 700;line-height: 30px">
            Generate
          </div>
        </div>
      </HButton>
    </div>

  </div>
</template>

<style scoped lang="stylus">

.prompt-div
  position relative
  box-sizing border-box
  margin 20px
  width 35%
  height 100%
  padding-bottom 40px
.pic-div
  flex 3
  box-sizing border-box
  padding 20px

  height 100%
  margin-bottom auto

.icon-generate
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
