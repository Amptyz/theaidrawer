<script setup lang="ts">

import HLoading from "@/components/HLoading.vue";
import {reactive} from "vue";
import {computed} from "vue";
import {watch} from "vue";
import {checkErase, checkGeneration, repaint} from "@/assets/api";
import {Image as Img} from "@/assets/api/type";
const props=defineProps<{
  taskId:string
}>()
const state = reactive<{
  loading:boolean
  isDrawing:boolean
  isDrawComplete:boolean
  drawingInterval:number
}>({
  loading:false,
  isDrawing:false,
  isDrawComplete:false,
  drawingInterval:0
})
const imgData = reactive<{
  image:Img
  imgUrl:string

}>({
  image:new Img('src/assets/avatar.jpg',400,400),
  imgUrl:''

})
const emits=defineEmits(['onFinishDraw'])
const isHintShow=computed(()=>{
  return !state.isDrawing&&!state.isDrawComplete
})

watch(
    ()=>props.taskId,
    (val,preval)=>{
      if(val!=''){
        state.loading=true
        state.isDrawing=true
        state.drawingInterval=setInterval(async () => {

          await checkErase(props.taskId).then(res => {
            console.log('检查返回的res', res)
            if(res.progress == 1)
            {
              imgData.image = new Img(res.url, 1, 1)
              imgData.imgUrl = res.url
              state.isDrawing = false
              state.isDrawComplete = true
              state.loading = false
              emits('onFinishDraw')
              clearInterval(state.drawingInterval)
            }
          })

        },5000)
      }
    }
)
</script>

<template>
  <div class="pic-panel">
    <HLoading :is-loading="state.loading">
      <div class="full" style="align-items: center;display: flex ">
        <div v-if="isHintShow" class="text-before-draw ">
          <i class='bx bxs-eraser' style="font-size: 50px"></i>
          <div style="font-size: 30px">
            你的擦除会在此处生成哦
          </div>
          <div>
            请输入一些描述和其它参数，然后点击“擦除”哈
          </div>
        </div>
      </div>
    </HLoading>
  </div>
</template>

<style scoped lang="stylus">
.pic-div
  box-sizing border-box
  padding 20px
  width 100%
  height 100%
  margin-bottom auto
.pic-panel
  width 100%
  height 100%
  border-radius 16px
  background-color var(--grey-color)
.text-before-draw
  width 100%
  position relative
  font-size 16px
  color var(--font-subject-color)
</style>