<script setup lang="ts">

import PrompPanel from "@/views/HomeView/components/PrompPanel.vue";
import {reactive, ref} from "vue";
import {draw} from "@/assets/api";
import type {drawRequest, ImgOption} from "@/assets/api/type";
import HLoading from "@/components/HLoading.vue";
import ImageGeneration from "@/views/HomeView/components/ImageGeneration.vue";
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
  negativePrompt:null,
  modelStyleId:1,
  width:null,
  height:null,
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
</script>

<template>
  <div class="full flex-row" style="background-color: var(--black-background)">

    <div class="prompt-div">
      <PrompPanel v-model="paras.prompt" :negative-prompt="paras.negativePrompt" @onDraw="drawImg">
      </PrompPanel>
    </div>

    <div class="pic-div">
      <ImageGeneration :taskId="data.taskId" @onFinishDraw="onFinishDraw"></ImageGeneration>
    </div>


  </div>
</template>

<style scoped lang="stylus">

.prompt-div

  box-sizing border-box
  padding 20px
  width 100%
  height 100%
  margin-top auto
  margin-bottom 20px
.pic-div
  box-sizing border-box
  padding 20px
  width 100%
  height 100%
  margin-bottom auto
</style>
