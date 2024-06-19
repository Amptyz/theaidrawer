<script setup lang="ts">

import HFormInput from "@/components/HFormInput.vue";
import {onMounted, reactive, ref} from "vue";
import {getIndividual, showMessage, updateInfo, uploadPortrait} from "@/assets/api";
import HAvatar from "@/components/HAvatar.vue";
import HFileUpload from "@/components/HFileUpload.vue";
import store from "@/store";
import HButton from "@/components/HButton.vue";
const data = reactive<{
  nickname:string
  introduction:string
}>({
  nickname:'昵称',
  introduction:'介绍'
})
const email = ref('')
const portrait = ref('@/assets/avatar.jpg')

const isMouseOverAvatar = ref(false)
const onMouseEnterAvatar = () =>{
  isMouseOverAvatar.value = true
}
const onMouseLeaveAvatar = () => {
  isMouseOverAvatar.value = false
}
onMounted(()=>{
  getIndividual().then(res=>{
    console.log('获取到的个人信息',res.data)
    data.nickname = res.data.nickname
    data.introduction = res.data.introduction
    email.value = res.data.email
    if(res.data.portrait){
      portrait.value = res.data.portrait
    }
  })
})
const upLoadImage = async (image : File) => {
  if(!image){
    alert('请先选图片')
    return
  }
  const formData = new FormData()
  formData.append('file',image)
  uploadPortrait(formData).then((res)=>{

    console.log('检查头像更新返回结果',res)
    if(res.code==0) {
      store.state.avatar_url = res.data
      showMessage('头像更新成功！','success')
    }else{
      showMessage('出错了！', 'error')
    }
  }).catch(()=>{
    showMessage('网络错误','error')
  })
}
</script>

<template>

  <div class="full main-panel flex-row">

      <div class="left-panel flex-column">

        <div style="margin: 20px">
          <div class="title" style="font-size: 36px">
            个人信息
          </div>
          <div class="flex-row flex-center-vertical" >
            <div class="left-bar"></div>
            <div class="subtitle">昵称</div>
          </div>

          <div class="form-input">
            <HFormInput name="昵称" v-model="data.nickname"></HFormInput>
          </div>
          <div class="flex-row flex-center-vertical" >
            <div class="left-bar"></div>
            <div class="subtitle">邮箱</div>
          </div>
          <div class="email-block">
            {{email}}
          </div>
          <div class="flex-row flex-center-vertical" >
            <div class="left-bar"></div>
            <div class="subtitle">自我介绍</div>
          </div>

          <div class="intro-block">
            <textarea class="input-field" v-model="data.introduction" placeholder="此处描述画面的关键词哦"/>
          </div>
          <div class="update-button">
            <HButton @click="updateInfo(data)">
              <div class="flex-row">
                <i class='bx bxs-magic-wand' style="font-size: 24px"></i>
                <div style="font-size: 18px;font-weight: 700;line-height: 24px">
                  更新信息
                </div>
              </div>
            </HButton>
          </div>
        </div>
      </div>
      <div class="right-panel flex-column">
        <div style="margin: 20px">
          <div class="flex-row flex-center-vertical" >
            <div class="left-bar"></div>
            <div class="subtitle">头像</div>
          </div>
          <div style="width: fit-content">


          <div style="position: relative; width: fit-content" class="avatar-box"
               @mouseenter="onMouseEnterAvatar"
               @mouseleave="onMouseLeaveAvatar">
            <HAvatar  size="200" class="avatar-icon"></HAvatar>
            <div :style="{opacity : isMouseOverAvatar ? '1' : '0'}"
                 class="center add-icon" >
              <HFileUpload @handleFile="upLoadImage"></HFileUpload>
            </div>
          </div>
          <div class="text-avatar">
            点击图片上传头像
          </div>
          </div>
        </div>
      </div>

  </div>
</template>

<style scoped lang="stylus">

.left-panel
  margin 20px
  background-color var(--grey-color-dark)
  border-radius 16px
  flex 3
  height 95%
  .email-block
    margin 10px 10px
    color var(--font-subject-color)
    text-align left
    font-size 18px
    height auto
  .intro-block
    font-size 18px
    color #7C839C
    padding 10px
    box-sizing border-box
    margin 10px
    width 98%
    height 200px
    background-color rgb(27, 27, 28)
    border-radius 12px
    box-shadow 2px 2px 1px var(--accent-text-color)
    .input-field
      font-size 16px
      color var(--font-subject-color)
  .update-button
    margin 10px
    width 200px
.right-panel
  margin 20px
  background-color var(--grey-color-dark)
  border-radius 16px
  flex 2
  height 95%
.form-input
  width 200px
  margin 10px 10px

.avatar-box
  display flex
  border-radius 999px
  &:hover
    cursor pointer
    .avatar-icon
      filter blur(4px)
      transition 0.3s
.add-icon
  width 100%
  height 100%
  position absolute
  transition 0.3s

.text-avatar
  font-size 14px
  color var(--accent-text-color)

</style>