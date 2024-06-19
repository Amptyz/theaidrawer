<script setup lang="ts">

import HImage from "@/components/HImage.vue";
import {reactive, ref} from "vue";
import {Image as Img} from "@/assets/api/type";

interface size{
  name:string,
  img:Img,
  des:string,
  x:number,
  y:number
}
const sizes = ref<Array<size>>([
  {
    name:'1:1',
    img:new Img('src/assets/Images/1^1.png',1,1),
    des:'头像',
    x:1,
    y:1
  },
  {
    name:'1:2',
    img:new Img('src/assets/Images/1^2.png',1,1),
    des:'宣传图',
    x:1,
    y:2
  },
  {
    name:'16:9',
    img:new Img('src/assets/Images/16^9.png',1,1),
    des:'壁纸',
    x:16,
    y:9
  },
  {
    name:'9:16',
    img:new Img('src/assets/Images/9^16.png',1,1),
    des:'手机壁纸',
    x:9,
    y:16
  },
  {
    name:'4:3',
    img:new Img('src/assets/Images/4^3.png',1,1),
    des:'横幅',
    x:4,
    y:3
  },
  {
    name:'3:4',
    img:new Img('src/assets/Images/3^4.png',1,1),
    des:'竖幅',
    x:3,
    y:4
  },
])
const data = reactive<{
  selectedStyle:number
}>({
  selectedStyle:0
})
const emits=defineEmits(['updateSize'])
const onSelectSize = (index:number)=>{
  data.selectedStyle = index
  emits('updateSize',sizes.value[index].x,sizes.value[index].y,)
}
</script>

<template>
  <div class="full">
    <div class="flex-row" style="justify-content:space-between;width: 97% ">
      <div v-for="(size,index) in sizes" class="size-area" @click="onSelectSize(index)" :style="{'border-color':data.selectedStyle==index?'#A95378':'#C4ACB9'}">
        <HImage :image="size.img" size="40" style="position: absolute;top:10%;left:25%"></HImage>
        <div class="style-name text-inverse">{{size.name}} <br>{{size.des}}</div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.size-area
  height 100px
  width 80px
  border-radius 8px
  overflow hidden
  position relative
  border 2px solid
  transition 0.3s
  cursor pointer
  background-color var(--black-color)

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