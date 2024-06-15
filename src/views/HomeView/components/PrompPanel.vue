<script setup lang="ts">
import {computed, reactive, watch} from "vue";
import HDivider from "@/components/HDivider.vue";
import HButton from "@/components/HButton.vue";
import HFileUpload from "@/components/HFileUpload.vue";
import HImageUpload from "@/components/HImageUpload.vue";
import StyleBox from "@/views/HomeView/components/StyleBox.vue";
import SizeBox from "@/views/HomeView/components/SizeBox.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import HScroller from "@/components/HScroller.vue";
import HSwitch from "@/components/HSwitch.vue";
import HFormInput from "@/components/HFormInput.vue";
import type {ImgOption} from "@/assets/api/type";
import ImageOptionPanel from "@/views/DrawView/components/ImageOptionPanel.vue";
const advancedOption = reactive<ImgOption>({
  removeBackground:null,
  redrawBackground:null,
  genderDetect:null,
  facePreservation:null,
  facePreservationCount:null,
  img:null,
})
const props = withDefaults(defineProps<{
  modelValue: string,
  negativePrompt: string
}>(),{

})
const data = reactive<{
  prompt:string
  negativePrompt:string
  hrScale:number
  hrStep:number
  detailLevel:number
  faceFix:boolean
  tilling:boolean
  seed:string
  imgOptions:ImgOption
  focus:boolean
  empty:boolean
}>({
  prompt:props.modelValue,
  negativePrompt:props.negativePrompt,
  hrScale:1,
  hrStep:15,
  detailLevel:5,
  faceFix:false,
  tilling:false,
  seed:'',
  imgOptions:advancedOption,
  focus:false,
  empty:false
})
const state = reactive<{
  hasImage:boolean
  isOptionPanel:boolean
}>({
  hasImage:false,
  isOptionPanel:false
})
const clearImgOption=()=>{
  data.imgOptions = advancedOption
}
const emits = defineEmits(['update:modelValue','updateNegativePrompt','updateImg','updateStyle','updateSize','updateHrScale','updateHrStep','updateDetailLevel','updateFaceFix','updateTilling','updateSeed','updateImgOption','updateDenoisingStrength'])

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
watch(
    ()=>data.hrScale,
    (val,preval)=>{
      console.log('hrScale改了！',val)
      emits('updateHrScale',val)
    }
)
watch(
    ()=>data.hrStep,
    (val,preval)=>{
      console.log('改了！',val)
      emits('updateHrStep',val)
    }
)
watch(
    ()=>data.detailLevel,
    (val,preval)=>{
      console.log('改了！',val)
      emits('updateDetailLevel',val)
    }
)
watch(
    ()=>data.faceFix,
    (val,preval)=>{
      console.log('改了！',val)
      emits('updateFaceFix',val)
    }
)
watch(
    ()=>data.tilling,
    (val,preval)=>{
      console.log('改了！',val)
      emits('updateTilling',val)
    }
)
watch(
    ()=>data.seed,
    (val,preval)=>{
      console.log('改了！',val)
      emits('updateSeed',val)
    }
)
watch(
    data.imgOptions,
    (val,preval)=>{
      console.log('改了！',val)
      emits('updateImgOption',val)
    }
)
const onFocus = () =>{
  data.focus = true
}
const onBlur = () => {
  data.focus = false
}
const updateImg = (imgUrl:string) =>{
  console.log('图片url',imgUrl)
  if(imgUrl!=''){
    state.hasImage = true
  }else{
    state.hasImage = false
  }
  emits('updateImg',imgUrl)
}
const updateStyle = (styleCode:number)=>{
  emits('updateStyle',styleCode)
}
const updateSize = (x:number,y:number)=>{
  emits('updateSize',x,y)
}
const updateImgOption = (option)=>{
  emits('updateImgOption',option)
}
const updateDenoisingStrength=(val:number)=>{
  emits('updateDenoisingStrength',val)
}
watch(
    ()=>state.hasImage,
    (val,preval)=>{
      if(!val){
        state.isOptionPanel=false
        updateImgOption(advancedOption)
      }
    }
)
</script>

<template>
  <div class="prompt-panel full flex-column">
    <HScroller scroll-direction="column">
      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">绘画描述</div>
      </div>
      <div class="flex-row text-region ">
        <textarea class="input-field" v-model="data.prompt" placeholder="此处描述画面的关键词哦"/>
        <div class="vertical-line"></div>
        <textarea class="input-field" v-model="data.negativePrompt" placeholder="此处描写用于排除画面中的内容哦"></textarea>
      </div>
      <div class="flex-row flex-center-vertical" >
        <div class="left-bar"></div>
        <div class="subtitle">图例上传</div>
<!--        <div v-if="true" class="text-bold" style="color: var(&#45;&#45;accent-text-color)" @click="state.isOptionPanel=!state.isOptionPanel">-->
<!--          图片高级设置-->
<!--        </div>-->
      </div>

      <div style="height: 200px">
        <HImageUpload @updateImg="updateImg"></HImageUpload>
      </div>
      <div class="flex-row flex-center-vertical" style="margin-top: 10px;overflow: hidden;transition: 0.3s" :style="{height:state.hasImage?'34px':'0'}" @click="state.isOptionPanel=!state.isOptionPanel">
        <div class="left-bar"></div>
        <div class="subtitle">图片高级设置</div>
        <div style="font-size: 30px;color: white;position: relative;left: -5px;top:3px;transition: 0.3s" :style="{transform:state.isOptionPanel?'rotate(90deg)':'rotate(0deg)'}">
          <i class='bx bx-chevron-right'></i>
        </div>
      </div>
      <div style="position: relative">
        <ImageOptionPanel :isShow="state.isOptionPanel&&state.hasImage" @updateImgOption="updateImgOption" @updateDenoisingStrength="updateDenoisingStrength"></ImageOptionPanel>
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
          <div class="subtitle">其它参数</div>
        </div>
        <div style="width: 80%;height: 40px;margin-left: 10px">
          <ProgressBar v-model="data.hrScale" :max=3 :min=1 name="高清倍率" :width=200></ProgressBar>
        </div>
        <div style="width: 80%;height: 40px;margin-left: 10px">
          <ProgressBar v-model="data.hrStep" :max=30 :min=5 name="高清处理步数" :width=200></ProgressBar>
        </div>
        <div style="width: 80%;height: 40px;margin-left: 10px">
          <ProgressBar v-model="data.detailLevel" :max=9 :min=1 name="细节倍率" :width=200></ProgressBar>
        </div>
        <div style="width: 100%;height: 40px; margin-left: 10px;" class="flex-row">
          <div style="width: 50%;position:relative">
            <div style="left: 0;position: absolute" class="flex-row">
              <div style="position: relative;color:white;line-height: 24px" class="text-bold">
                面部修复
              </div>
              <HSwitch v-model:checked="data.faceFix" style="margin-left: 10px"></HSwitch>
            </div>

          </div>
          <div style="width: 50%;position: relative">
            <div style="left: 0;position: absolute" class="flex-row">
              <div style="position: relative;color:white;line-height: 24px" class="text-bold">
                花纹贴图
              </div>
              <HSwitch v-model:checked="data.tilling" style="margin-left: 10px"></HSwitch>
            </div>
          </div>

        </div>
        <div class="flex-row" style="margin-left: 10px">
          <div class="text-bold" style="line-height: 40px">
            种子
          </div>
          <HFormInput name="种子" v-model="data.seed" style="margin-left: 10px"></HFormInput>
        </div>

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
</style>