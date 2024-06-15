<script setup lang="ts">

import HImage from "@/components/HImage.vue";
import HFileUpload from "@/components/HFileUpload.vue";
import {ref, withDefaults, defineProps, reactive, defineExpose, defineEmits, computed} from "vue";
import {Image as Img} from "@/assets/api/type";
import {getBase64, uploadImage} from "@/assets/api";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultImage = new Img('src/assets/avatar.jpg',100,100)
const props = withDefaults(defineProps<{
  image? : Img
}>(),{

})
const data = reactive<{
  image : Img,
  pic : string,
  isHaveImage : boolean,
  isDragOver : boolean
}>({
  image : props.image? props.image:defaultImage,
  pic : '',
  isHaveImage : !!props.image,
  isDragOver:false
})
const fileInput = ref<HTMLInputElement>()
const clickFileInput = () => {
  fileInput.value?.click()
}
// const selectedFile = ref()
const handleImage = (event : any) =>{
  event.preventDefault()
  data.isDragOver=false
  const files = event.target.files || event.dataTransfer.files
  if(!files.length) return;
  //selectedFile.value = files[0]
  let file = files[0]
  getBase64(files[0]).then(res=>{
    console.log(res)
    emits('updateBase64',res)
  })

  handleImageStep2(files[0])

}

// const picFile = ref()
// const getPicFile = ()=>{
//   return picFile.value
// }
// defineExpose({
//   getPicFile
// })
const emits= defineEmits(['updateBase64'])

const handleImageStep2 = (image : File) =>{
  console.log('图片文件信息',image)
  let imageFile = new Image()
  imageFile.src = window.URL.createObjectURL(image)
  imageFile.onload = () => {
    data.image = new Img(imageFile.src, imageFile.width, imageFile.height)
  }
  data.isHaveImage = true

}
const cancelImage = ()=>{
  data.isHaveImage = false
  fileInput.value.value=''
  emits('updateBase64','')
}
const backgroundColor = computed(()=>{
  return data.isDragOver?'#A95378':'#1B1B1C'
})
const dragOverHandler = ref()
const handleDragOver = () =>{
  clearTimeout(dragOverHandler.value)
  data.isDragOver = true
  dragOverHandler.value = setTimeout(()=>{
    data.isDragOver = false
  },100)
}
</script>

<template>
  <div class="upload-box" :style="{'background-color':backgroundColor}"
       @click="clickFileInput"
       @drop="handleImage"
       @dragover.prevent="handleDragOver"
       @dragenter.prevent
  >
    <div class="center flex-column flex-center" v-if="data.isHaveImage" >
      <HImage :image="data.image" :size="100" ></HImage>
      <div class="text-accent" style="margin: 10px 10px">
        上传成功！将以此图片为模板进行绘制
      </div>
    </div>

    <div v-if="!data.isHaveImage" class="center" style="color: white">
      <i class='bx bx-cloud-upload' style="font-size: 30px"></i>
      <div class="text-inverse">此处上传蒙版图片，将图片拖拽到此处</div>
      <div class="flex-row flex-center-horizontal">
        <span class="text-inverse">或者</span>
        <div class="text-accent">点击上传</div>
      </div>

    </div>
    <div class="close-icon" style="color: #7C839C " v-if="data.isHaveImage" @click.stop="cancelImage">
      <i class='bx bx-x-circle'></i>
    </div>
    <input type="file" accept="image/*" @input="handleImage" ref="fileInput" style="display: none"/>
  </div>

</template>

<style scoped lang="stylus">
.upload-box
  height 100px
  margin 10px 15px
  position relative
  background-color rgb(27,27,28)
  display flex
  border 2px dashed rgb(56,55,58)
  border-radius 8px
  transition 0.3s
  &:hover
    cursor pointer
    .avatar-icon
      filter blur(4px)
      transition 0.3s

.file-input
  display flex
  flex-direction row

.file-select
  font-size 100px
  cursor pointer

.close-icon
  position absolute
  right 10px
  bottom 0
  font-size 50px

</style>