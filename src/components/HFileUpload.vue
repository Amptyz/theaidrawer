<script setup lang="ts">

import {ref,defineEmits,withDefaults, defineProps} from "vue";


const fileInput = ref<HTMLInputElement>()
const emit = defineEmits(['handleFile'])
const clickFileInput = () => {
  fileInput.value?.click()
}

const props = withDefaults(defineProps<{
  fileType?: string
}>(), {
  fileType: 'image/*'
})

const selectedFile = ref()
const handleImage = (event : any) =>{
  const files = event.target.files || event.dataTransfer.files
  if(!files.length) return;
  selectedFile.value = files[0]
  emit('handleFile',selectedFile.value)
  console.log('handleImage')
}

</script>

<template>
  <div class="full" @click="clickFileInput" >
    <input type="file" :accept="fileType" @change="handleImage" ref="fileInput" style="display: none"/>
  </div>
</template>

<style scoped lang="stylus">
.file-input
  display flex
  flex-direction row

.file-select
  font-size 100px
  cursor pointer
</style>