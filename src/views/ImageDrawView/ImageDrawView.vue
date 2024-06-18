<script setup lang="ts">
import {reactive, ref} from "vue";
import {draw} from "@/assets/api";
import type {drawRequest, ImgOption} from "@/assets/api/type";
import ImageGeneration from "@/views/DrawView/components/ImageGeneration.vue";
import HButton from "@/components/HButton.vue";
import ImagePropmpPanel from "@/views/ImageDrawView/components/ImagePropmpPanel.vue";
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
</script>

<template>
  <div class="full flex-row" style="background-color: var(--black-background)">

    <div class="prompt-div">
      <ImagePropmpPanel @updateImg="updateImg"
                  @updateStyle="updateStyle"
                  @updateSize="updateSize"
                  @updateNegativePrompt="updateNegativePrompt">
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
      </ImagePropmpPanel>

    </div>

    <div class="pic-div">
      <ImageGeneration :taskId="data.taskId" @onFinishDraw="onFinishDraw"></ImageGeneration>
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
  right 0
  bottom 0
  cursor pointer
  font-size 30px
  color var(--theme-color-bright)
  margin-right 10px
  margin-bottom 5px
  &:hover
    color var(--accent-color-dark)
</style>
