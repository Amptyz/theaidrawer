<script setup lang="ts">

import HLoading from "@/components/HLoading.vue";
import {computed, reactive, ref, watch} from "vue";
import HImage from "@/components/HImage.vue";
import {Image as Img} from "@/assets/api/type";
import {checkGeneration, repaint, shareImg, showMessage} from "@/assets/api";
import UploadBase64 from "@/components/UploadBase64.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import HButton from "@/components/HButton.vue";
import store from "@/store";
const data = reactive<{
  curTaskId:string
  loading:boolean
  isDrawing:boolean
  isDrawComplete:boolean
  image:Img
  imgUrl:string
  drawingInterval:number
}>({
  curTaskId:'',
  loading:false,
  isDrawing:false,
  isDrawComplete:false,
  image:new Img('src/assets/avatar.jpg',400,400),
  imgUrl:'',
  drawingInterval:0
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
const redrawTaskId = ref('')
const redrawData = reactive<{
  prompt:string
  taskId:string
  denoisingStrength:number
  mask:string|null
}>({
  prompt:'',
  taskId:'',
  denoisingStrength:0.1,
  mask:null
})
const props=defineProps<{
  taskId:string
}>()
const emits=defineEmits(['onFinishDraw'])
const onLoaded = ()=>{
  console.log('加载完成！')
  data.loading = false;
}
const onNewImgLoaded= ()=>{
  newImgData.loading = false
}
watch(
    ()=>props.taskId,
    (val,preval)=>{
      if(val!=''){
        data.curTaskId = val
        redrawData.taskId = val
        data.loading=true
        data.isDrawing=true
        data.drawingInterval=setInterval(async () => {

          await checkGeneration(props.taskId).then(res => {
            console.log('检查返回的res', res)
            if(res.progress == 1)
            {
              data.image = new Img(res.url, 1, 1)
              data.imgUrl = res.url
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
const updateMask = (mask)=>{
  if(mask==''){
    redrawData.mask=null
  }else{
    redrawData.mask=mask
  }
  console.log('蒙版图片更新成功！',redrawData.mask)
}
const downloadImg = (name: string) => {
  const image = new Image()
  image.setAttribute("crossOrigin","anonymous")
  image.src = data.imgUrl
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
const openRedrawPanel = () => {
  store.state.isRedraw = !store.state.isRedraw
}
const redraw = () => {
  repaint(redrawData).then(res=>{
    redrawTaskId.value= res.data
    newImgData.isDrawing=true
    newImgData.drawingInterval=setInterval(async () => {

      await checkGeneration(redrawTaskId.value).then(res => {
        console.log('检查返回的res', res)
        if(res.progress == 1)
        {
          newImgData.image = new Img(res.url, 1, 1)
          newImgData.imgUrl = res.url
          newImgData.isDrawing = false
          newImgData.isDrawComplete = true
          clearInterval(newImgData.drawingInterval)
        }
      })

    },5000)

  })
}
const startDraw = ()=>{
  data.loading=true
  data.isDrawing=true
  showMessage('成功创建绘画任务','success')
}
const onError = () => {
  data.loading = false
  data.isDrawing = false
  showMessage('网络错误，请重试！','error')
}
const endDraw = () =>{
  clearInterval(data.drawingInterval)
  data.loading = false
  data.isDrawing = false
  showMessage('中止绘画成功','info')
}
const getImage = (url:string) => {
  data.image = new Img(url,1,1)
  data.loading = false
  data.isDrawing = false
  data.isDrawComplete = true
  data.imgUrl = url
}
defineExpose({
  startDraw,onError,endDraw,getImage
})
</script>

<template>
    <div class="pic-panel">
      <HLoading  :isLoading="data.loading">
        <div class="full" style="align-items: center;display: flex ">
<!--          <div v-if="isHintShow" class="text-before-draw ">-->
          <div v-if="isHintShow" class="text-before-draw ">
            <i class='bx bx-paint' style="font-size: 50px"></i>
            <div style="font-size: 30px">
              你的绘画会在此处生成哦
            </div>
            <div>
              请输入一些描述和其它参数，然后点击“生成”哈
            </div>
          </div>

<!--          <div v-else-if="data.isDrawComplete&&!data.isDrawing" class="image-show flex-column">-->
          <div v-else-if="data.isDrawComplete&&!data.isDrawing" class="completed-block flex-column flex-center-vertical">
            <div class="image-show flex-row">
              <div style="display: inline-block;width: 50%" class="flex-column">
                <div class="img-title" >
                  生成图片
                </div>
                <HImage :image=data.image size="300" @load="onLoaded">
                </HImage>
              </div>
              <div v-if="newImgData.isDrawing" style="display: inline-block;width: 50%">
                <div class="img-title" >
                  重绘中。。。
                </div>
                <HLoading :is-loading="newImgData.isDrawing">
                  <div style="width: 370px;height: 370px">

                  </div>
                </HLoading>
              </div>
              <div v-if="newImgData.isDrawComplete" style="display: inline-block;width: 50%">
                <div class="img-title" >
                  重绘图片
                </div>
                <HImage  :image=newImgData.image size="300" @load="onNewImgLoaded"></HImage>
              </div>

            </div>
            <div class="operation-panel flex-row" >
              <div class="flex-column operation-block" @click="downloadImg">
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
              <div class="flex-column operation-block" @click="openRedrawPanel">
                <i class='bx bxs-paint-roll' ></i>
                <div style="font-size: 14px;font-weight: 600">
                  重绘
                </div>
              </div>
            </div>

            <div class="redraw-panel" :style="{height:store.state.isRedraw?'400px':'0'}">
              <div class="flex-row" style="height: 50%">

                <div style="width: 50%">
                  <div class="flex-row flex-center-vertical" >
                    <div class="left-bar"></div>
                    <div class="subtitle">重绘描述</div>
                  </div>
                  <div class="flex-row text-region ">
                    <textarea class="input-field" v-model="redrawData.prompt" placeholder="此处输入重绘的描述哦"/>
                  </div>
                </div>

                <div style="width: 50%">
                  <div class="flex-row flex-center-vertical" >
                    <div class="left-bar"></div>
                    <div class="subtitle">蒙版图片</div>
                  </div>
                  <div style="height: 100px">
                    <UploadBase64 @updateBase64="updateMask"></UploadBase64>
                  </div>

                </div>

              </div>
              <div class="horizontal-line"></div>
              <div class="flex-row flex-center-vertical" >
                <div class="left-bar"></div>
                <div class="subtitle">重绘幅度</div>
              </div>
              <div style="height: 40px;margin-left: 10px;margin-top: 10px;width: 300px">
                <ProgressBar name="重绘幅度" v-model="redrawData.denoisingStrength" :max="1" :min="0" :step="0.1"></ProgressBar>
              </div>
              <div class="redraw-button">
                <HButton  @click="redraw">
                  <div class="flex-row full">
                    <i class='bx bxs-magic-wand' style="font-size: 30px"></i>
                    <div style="font-size: 18px;font-weight: 700;line-height: 30px">
                      重绘
                    </div>
                  </div>
                </HButton>
              </div>
            </div>

            <div v-if="!store.state.isRedraw">
              <div class="text-complete">
                绘制完成！
              </div>
              <div class="text-bold">
                点击右下角按钮开始新的绘画
              </div>
            </div>
          </div>
        </div>
      </HLoading>

    </div>

</template>

<style scoped lang="stylus">
.pic-div
  position: relative
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
  width 47%
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