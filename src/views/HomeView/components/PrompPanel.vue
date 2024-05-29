<script setup lang="ts">
import {reactive, watch} from "vue";
import HDivider from "@/components/HDivider.vue";
import HButton from "@/components/HButton.vue";
const props = withDefaults(defineProps<{
  modelValue: string,
  negativePrompt: string
}>(),{

})
const data = reactive<{
  prompt:string
  negativePrompt:string
  focus:boolean
  empty:boolean
}>({
  prompt:props.modelValue,
  negativePrompt:props.negativePrompt,
  focus:false,
  empty:false
})
const emits = defineEmits(['onDraw','update:modelValue','update:negativePrompt'])

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
      data.prompt = val
    }
)

watch(
    () => data.negativePrompt,
    (val, preval) => {
      emits('update:negativePrompt', val);
    },
    {}
)
const onFocus = () =>{
  data.focus = true
}
const onBlur = () => {
  data.focus = false
}
const drawImg = () => {
  emits('onDraw')
}
</script>

<template>
  <div class="prompt-panel full flex-column">
    <div class="flex-row text-region ">
      <textarea class="input-field" v-model="data.prompt" @focus="onFocus" @blue="onBlur" placeholder="此处描述画面的关键词哦"/>
<!--        <div class="vertical-line">-->
<!--        </div>-->

      <textarea class="input-field" v-model="data.negativePrompt" placeholder="此处描写用于排除画面中的内容哦"></textarea>

    </div>

    <div style="width: 98%" class="horizontal-line"></div>

    <div class="setting-panel">
      <div class="subtitle">
         高级设置
      </div>
    </div>

    <div class="icon-generate">
      <HButton  @click="drawImg">
        <div class="flex-row full">
          <i class='bx bxs-magic-wand' style="font-size: 30px"></i>
          <div style="font-size: 18px;font-weight: 700;line-height: 30px">
            Generate
          </div>
        </div>


      </HButton>
    </div>




  </div>
</template>

<style scoped lang="stylus">
.text-region
  width 100%
  height 30%
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
  height 100%
  flex 2
.icon-generate
  width 150px
  position: absolute
  right 0
  bottom 0
  cursor pointer
  font-size 30px
  color var(--theme-color-bright)
  margin-right 10px
  margin-bottom 5px
  &:hover
    color var(--accent-color-dark)
.vertical-line
  width 1px
  background-color var(--grey-color)
  height 100%
.horizontal-line
  height 1px
  background-color var(--grey-color)
  width 100%

</style>