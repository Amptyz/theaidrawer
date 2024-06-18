<script setup lang="ts">
import ErasePanel from "@/views/EraseView/components/ErasePanel.vue";
import {reactive, ref} from "vue";
import HButton from "@/components/HButton.vue";
import {imgErase} from "@/assets/api";
import ImageGeneration from "@/views/DrawView/components/ImageGeneration.vue";
import EraseGeneration from "@/views/EraseView/components/EraseGeneration.vue";
const data = reactive<{
  taskId:string
}>({
  taskId:''
})
const erasePanel = ref()
const eraseImg = () =>{
  console.log('擦除任务',erasePanel.value.data)
  imgErase(erasePanel.value.data).then(res=>{
    data.taskId = res.data
    console.log('擦除任务taskId',data.taskId)
  })
}
const onFinishDraw = () => {

}
</script>

<template>
  <div class="full flex-row">
    <div class="prompt-div">
      <ErasePanel ref="erasePanel"></ErasePanel>
    </div>
    <div class="pic-div">
      <EraseGeneration :taskId="data.taskId" @onFinishDraw="onFinishDraw"></EraseGeneration>
    </div>
    <div class="icon-generate">
      <HButton  @click="eraseImg">
        <div class="flex-row full">
          <i class='bx bxs-eraser' style="font-size: 30px"></i>
          <div style="font-size: 18px;font-weight: 700;line-height: 30px">
            擦除
          </div>
        </div>
      </HButton>
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

.icon-generate
  width 150px
  position: absolute
  right 20px
  bottom 5px
  cursor pointer
  font-size 30px
  color var(--theme-color-bright)
  margin-right 10px
  margin-bottom 5px
  &:hover
    color var(--accent-color-dark)

.pic-div
  flex 3
  box-sizing border-box
  padding 20px
  height 100%
  margin-bottom auto
</style>