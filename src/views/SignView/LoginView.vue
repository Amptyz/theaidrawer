<template>

    <div class="login-panel">
      <div class="center-title-inverse" >登录</div>
      <div class="hint">登录账号以开启你的ai绘画之旅</div>
      <HInput
          name="邮箱"
          v-model="data.email"
          :state="correct.email? 'default' : 'error'"
          :information="information.email"
          @blur="onBlurEmail"
          style="margin: 16px 0"
      ></HInput>
      <HInput
          :password="true"
          name="密码"
          v-model="data.password"
          :state="correct.password? 'default' : 'error'"
          :information="information.password"
          style="margin: 16px 0"
      ></HInput>
      <HButton @click="onSignIn" style="margin: 26px 0">登录</HButton>
      <HDivider>Or</HDivider>
      <div style="text-align: center">
        <span class="hint">还没有账号? </span>
        <span class="clickable-text" @click="goRegistry">注册</span>
      </div>
    </div>

</template>

<script setup lang="ts">
import HInput from "@/components/HInput.vue";
import HButton from "@/components/HButton.vue"
import {reactive} from "vue";
import HDivider from "@/components/HDivider.vue";
import {goto, showMessage, signIn} from "@/assets/api";
const data = reactive<{
  email : string
  password : string
}>({
  email : '',
  password : ''
})

const correct = reactive<{
  email : boolean
  password : boolean
}>({
  email : true,
  password : true
})

const information = reactive<{
  email : string
  password : string
}>({
  email : '',
  password : ''
})

function goRegistry(){
  goto('/Registry');
}
function onSignIn(){
  signIn(data)
  showMessage('登录成功！','success')
}

const onBlurEmail = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(emailRegex.test(data.email)) {
    correct.email = true
    information.email = ''
  } else {
    correct.email = false
    information.email = '非法的邮件格式'
  }
}
</script>

<style scoped lang="stylus">

.login-panel
  position: absolute
  top 15%
  width 70%
  max-width 330px
  background-color (--black-background)

</style>
