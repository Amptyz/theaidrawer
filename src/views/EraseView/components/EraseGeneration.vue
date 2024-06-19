<script setup lang="ts">

import HLoading from "@/components/HLoading.vue";
import {reactive} from "vue";
import {computed} from "vue";
import {watch} from "vue";
import {checkErase, checkGeneration, repaint, shareImg, showMessage} from "@/assets/api";
import {Image as Img} from "@/assets/api/type";
import HImage from "@/components/HImage.vue";
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
const newImgData = reactive<{

  image:Img
  isDrawing:boolean
  isDrawComplete:boolean
  loading:boolean
  imgUrl:string
  drawingInterval:number
}>({

  image:new Img('src/assets/avatar.jpg',400,400),
  isDrawing:false,
  isDrawComplete:false,
  loading:false,
  imgUrl:'',
  drawingInterval:1
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

        },3000)
      }
    }
)
const startDraw = ()=>{
  state.loading=true
  state.isDrawing=true
  showMessage('成功创建绘画任务','success')
}
const onError = () => {
  state.loading = false
  state.isDrawing = false
  showMessage('网络错误，请重试！','error')
}
const endDraw = () =>{
  clearInterval(state.drawingInterval)
  state.loading = false
  state.isDrawing = false
  showMessage('中止绘画成功','info')
}
defineExpose({
  startDraw,onError,endDraw
})
const onLoaded = ()=>{
  console.log('加载完成！')
  state.loading = false;
}
const downloadImg = (name: string,imgUrl:string) => {
  const image = new Image()
  image.setAttribute("crossOrigin","anonymous")
  image.src = imgUrl
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = name || "photo";
      a.href = url;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
}
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
        <div v-else-if="state.isDrawComplete&&!state.isDrawing" class="completed-block flex-column flex-center-vertical">
          <div class="image-show flex-row">
            <div style="display: inline-block;width: 50%" class="flex-column">
              <div class="img-title" >
                生成图片
              </div>
              <HImage :image=imgData.image size="300" @load="onLoaded">
              </HImage>
            </div>

          </div>
          <div class="operation-panel flex-row" >
            <div class="flex-column operation-block" @click="downloadImg('擦除图片',imgData.imgUrl)">
              <i class='bx bxs-download' ></i>
              <div style="font-size: 14px;font-weight: 600">
                下载
              </div>
            </div>
            <div class="flex-column operation-block" @click="shareImg">
              <i class='bx bxs-share' ></i>
              <div style="font-size: 14px;font-weight: 600">
                分享
              </div>
            </div>

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
.completed-block
  height 100%
  width 100%

.image-show
  justify-content center
  width 100%
  margin 10px auto
  margin-top 100px


.redraw-panel
  position: relative
  z-index 1000
  background-color var(--grey-color-dark)
  border-radius 16px
  border 2px solid var(--grey-color)
  margin-top 30px
  width 98%
  overflow hidden
  transition 0.3s

.text-region
  width 100%
  height 100px
.input-field
  box-sizing border-box
  padding 10px 10px
  width 100%
  height 100%
  font-size 16px
  color var(--font-subject-color)
.redraw-button
  width 140px
  position: absolute
  right 10px
  bottom 5px
  cursor pointer
  font-size 30px
  color var(--theme-color-bright)
  margin-right 10px

.operation-panel
  margin-top 25px
  width 26%
  justify-content space-between
  .operation-block
    box-sizing border-box
    padding 10px
    border-radius 10px
    background-color var(--grey-color-dark)
    color white
    font-size 24px
    cursor pointer
  .operation-block:hover
    color var(--accent-color)
    transition 0.3s

.text-complete
  color var(--accent-text-color)
  font-size 24px
  font-weight 600

.img-title
  color var(--accent-text-color)
  font-size 18px
  font-weight 600
  margin-bottom 40px
</style>