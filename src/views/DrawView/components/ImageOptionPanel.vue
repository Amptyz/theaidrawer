<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import type {ImgOption} from "@/assets/api/type";
import HSwitch from "@/components/HSwitch.vue";
import HButton from "@/components/HButton.vue";
import ProgressBar from "@/components/ProgressBar.vue";
const props = withDefaults(defineProps<{
  isShow:boolean
}>(),{

})
const emits = defineEmits(['updateImgOption','updateDenoisingStrength'])
const state = reactive<{

}>({

})
const imgOptions = reactive<ImgOption>({
  img:null,
  removeBackground:null,
  redrawBackground:null,
  genderDetect:null,
  facePreservation:null,
  facePreservationCount:null
})
const denoisingStrength=ref(0.1)
const panelHeight = computed(()=>{
  if(props.isShow){
    return '220px'
  }else
  return '0'
})
watch(
    imgOptions,
    (val,preval)=>{
      console.log('监听imgOptions',val)
      emits('updateImgOption',val)
    }
)
watch(
    ()=>denoisingStrength.value,
    (val,preval)=>{
      console.log('监听重回幅度',val)
      emits('updateDenoisingStrength',val)
    }
)

</script>

<template>
<div class="option-panel" :style="{height:panelHeight}">

  <div style="width: 100%;height: 40px; margin-left: 10px;margin-top: 10px" class="flex-row">
    <div style="width: 30%;position:relative">
      <div style="left: 0;position: absolute" class="flex-row">
        <div style="position: relative;color:white;line-height: 24px" class="text-bold">
          移除背景
        </div>
        <HSwitch v-model:checked="imgOptions.removeBackground" style="margin-left: 10px"></HSwitch>
      </div>
    </div>
    <div style="width: 30%;position: relative">
      <div style="left: 0;position: absolute" class="flex-row">
        <div style="position: relative;color:white;line-height: 24px" class="text-bold">
          重绘背景
        </div>
        <HSwitch v-model:checked="imgOptions.redrawBackground" style="margin-left: 10px"></HSwitch>
      </div>
    </div>
    <div style="width: 30%;position: relative">
      <div style="left: 0;position: absolute" class="flex-row">
        <div style="position: relative;color:white;line-height: 24px" class="text-bold">
          性别识别
        </div>
        <HSwitch v-model:checked="imgOptions.genderDetect" style="margin-left: 10px"></HSwitch>
      </div>
    </div>
  </div>
  <div style="width: 100%;height: 40px; margin-left: 10px;margin-top: 10px" class="flex-row">
    <div style="width: 30%;position: relative">
      <div style="left: 0;position: absolute" class="flex-row">
        <div style="position: relative;color:white;line-height: 24px" class="text-bold">
          人脸检测
        </div>
        <HSwitch v-model:checked="imgOptions.facePreservation" style="margin-left: 10px"></HSwitch>
      </div>
    </div>
    <div style="width: 60%;height: 40px;margin-left: 10px">
      <ProgressBar v-model="imgOptions.facePreservationCount" :max=5 :min=1 name="人脸保持数量" :width=200></ProgressBar>
    </div>

  </div>
  <div style="height: 40px;margin-left: 10px;margin-top: 10px">
    <ProgressBar name="重绘幅度" v-model="denoisingStrength" :max="1" :min="0" :step="0.1"></ProgressBar>
  </div>


</div>
</template>

<style scoped lang="stylus">
.option-panel
  overflow hidden
  position absolute
  z-index 999
  background-color rgb(27,27,28)
  width 100%
  transition 0.3s
</style>