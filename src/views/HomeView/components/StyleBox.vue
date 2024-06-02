<script setup lang="ts">

import {reactive, ref} from "vue";
import {Image as Img} from "@/assets/api/type";
import HImage from "@/components/HImage.vue";
interface style {
  name:string,
  img:Img,
  code:number
}

const styles = ref<Array<style>>([
  {
    name:'二次元',
    img:new Img('src/assets/Images/anime.png',120,100),
    code:1
  },
  {
    name:'写实',
    img:new Img('src/assets/Images/real.png',120,100),
    code:15
  },
  {
    name:'粘土',
    img:new Img('src/assets/Images/clay.png',120,100),
    code:1795
  },
  {
    name:'高级动漫',
    img:new Img('src/assets/Images/highAnime.png',120,100),
    code:1811
  },
  {
    name:'Q版',
    img:new Img('src/assets/Images/qCute.png',120,100),
    code:853
  },
])

const data = reactive<{
  selectedStyle:number
}>({
  selectedStyle:0
})
const emits=defineEmits(['updateStyle'])
const onSelectStyle = (index:number)=>{
  data.selectedStyle = index
  emits('updateStyle',styles.value[index].code)
}
</script>

<template>
  <div class="full">
    <div class="flex-row" style="justify-content:space-between;width: 97% ">
      <div v-for="(style,index) in styles" class="style-area" @click="onSelectStyle(index)" :style="{'border-color':data.selectedStyle==index?'#A95378':'#C4ACB9'}">
        <HImage :image="style.img" size="100"></HImage>
        <div class="style-name text-inverse">{{style.name}}</div>
        <div class="style-mask"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.style-area
  border-radius 8px
  overflow hidden
  position relative
  border 2px solid
  transition 0.3s
  cursor pointer

.style-name
  position absolute
  z-index 1
  bottom 4px
  left 0
  width 100%

.style-mask
  position absolute
  width 100%
  height 24px
  bottom 0
  left 0
  background-color black
  opacity .7
</style>