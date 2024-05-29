<script setup lang="ts">

import HLoading from "@/components/HLoading.vue";
import {computed, reactive, ref, watch} from "vue";
import HImage from "@/components/HImage.vue";
import {Image as Img} from "@/assets/api/type";
import {checkGeneration} from "@/assets/api";
const data = reactive<{
  loading:boolean
  isDrawing:boolean
  isDrawComplete:boolean
  image:Img
  drawingInterval:number
}>({
  loading:false,
  isDrawing:false,
  isDrawComplete:false,
  image:new Img('src/assets/avatar.jpg',400,400),
  drawingInterval:0
})
const props=defineProps<{
  taskId:string

}>()
const emits=defineEmits(['onFinishDraw'])
watch(
    ()=>props.taskId,
    (val,preval)=>{
      if(val!=''){
        data.loading=true
        data.isDrawing=true
        data.drawingInterval=setInterval(async () => {

          await checkGeneration(props.taskId).then(res => {
            console.log('检查返回的res', res)
            if(res.progress == 1)
            {
              data.image = new Img(res.url, 1, 1)
              data.isDrawing = false
              data.isDrawComplete = true
              data.loading = false
              emits('onFinishDraw')
              clearInterval(data.drawingInterval)
            }
          })

        },5000)
      }
    }
)
const isHintShow=computed(()=>{
  return !data.isDrawing&&!data.isDrawComplete
})
const isPicShow=computed(()=>{
  return !data.isDrawing&&data.isDrawComplete
})
</script>

<template>
    <div class="pic-panel">
      <HLoading  :isLoading="data.loading">
        <div class="full" style="align-items: center;display: flex ">
          <div v-if="isHintShow" class="text-before-draw ">
            <i class='bx bx-paint' style="font-size: 50px"></i>
            <div style="font-size: 30px">
              你的绘画会在此处生成哦
            </div>
            <div>
              请输入一些描述和其它参数，然后点击“生成”哈
            </div>

          </div>

          <div v-else-if="data.isDrawComplete&&!data.isDrawing" class="image-show">

            <HImage :image=data.image size="300">

            </HImage>
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

.image-show
  width 100%
  display flex
  align-items center
  justify-content center
</style>