

<script setup lang="ts">
import store from "@/store";
import HIcon from '@/components/HIcon.vue'
import HDivider from "@/components/HDivider.vue";
import HScroller from "@/components/HScroller.vue";
import {onMounted,reactive} from "vue";
import HAvatar from "@/components/HAvatar.vue";
import {sendToGpt, startGptTalk} from "@/assets/axios/gpt";
import HButton from "@/components/HButton.vue";
onMounted(() => {
  startTalk()
})

const startTalk = async () => {
  data.conversation_id = await startGptTalk()
  store.state.talkHistories.push({
    content: '你好，我是小帕瓦,请问有什么能帮助你的吗',
    selfSend: false
  })
}

const data = reactive<{
  conversation_id : string
  text: string
  loading: boolean
}>({
  text: '',
  conversation_id : '',
  loading: false
})

const onSubmit = async () => {
  if (data.text === '' || data.loading) return
  store.state.talkHistories.push({
    content: data.text,
    selfSend: true
  })
  data.loading = true
  store.state.talkHistories.push({
    content: '',
    selfSend: false
  })
  sendToGpt(data.conversation_id,data.text).then(res=>{
    store.state.talkHistories[store.state.talkHistories.length - 1].content = res
    data.loading = false
  })
  data.text = ''
}

const onFlush = async () => {
  data.loading = true
  data.conversation_id = await startGptTalk()
  store.state.talkHistories = []
  store.state.talkHistories.push({
    content: '你好，我是小帕瓦,请问有什么能帮助你的吗',
    selfSend: false
  })
  data.loading = false
}

</script>
<template>
  <div class="full" style="background-color: var(--black-background);padding:1px">
        <div class="talk-bar-main flex-column">
            <div class="flex-row" style="width: 100%;justify-content: space-between">
              <div class="flex-row flex-center-vertical" >
                <div class="left-bar"></div>
                <div class="subtitle">小帕瓦聊天人</div>
              </div>
<!--              <div class="flex-row" style="gap: 10px">-->
<!--                <div class="subtitle">智能助教</div>-->
<!--                <div class="hint" style="transform: translate(0, 3px)">你的AI学习助手</div>-->
<!--              </div>-->
              <div class="flex-row sync" @click="onFlush">
                <div style="font-size: 12px">重置会话</div>
                <div class="box-icon" style="font-size: 20px">
                  <i class='bx bx-sync'></i>
                </div>
              </div>
            </div>
          <div class="horizontal-line" style="width: 100%;margin: 12px 0"></div>

            <div style="flex-grow: 1; width: calc(100% + 15px); min-height: 0">
              <HScroller :scroll-direction="'column'">
                <div class="history-content">
                  <transition-group
                      name="animate__animated animate__fade"
                      enter-active-class="animate__fadeInBottom"
                      leave-active-class="animate__fadeOut"
                      mode="out-in"
                  >
                    <div v-for="(history, index) in store.state.talkHistories" :key="index">
                      <div v-if="history.selfSend" class="flex-row history" style="justify-content: flex-end">
                        <div class="content text-inverse" style="background-color: var(--theme-color)">{{ history.content }}</div>
                        <HAvatar :size="35" style="padding: 0"></HAvatar>
                      </div>
                      <div v-else class="flex-row history" style="justify-content: flex-start">
                        <HIcon :size="35"></HIcon>
                        <div class="content text" style="background-color: var(--grey-color-bright)">
                          <div v-if="history.content.length > 0"> {{ history.content }} </div>
                          <div class="spinner1" style="width: 30px; height: 30px; background-color: var(--black-color); --b: 4px" v-else></div>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </HScroller>
            </div>
          <div class="horizontal-line" style="width: 100%;margin: 12px 0"></div>

            <div class="talk-input-area" style="flex-shrink: 0">
              <textarea v-model="data.text" class="input-field"></textarea>

                <div class="submit-button">
                  <HButton @click="onSubmit" :class="{'forbidden' : data.loading}">
                    <div style="font-size: 16px">
                      <i class='bx bx-send'></i>
                    </div>
                  </HButton>
                </div>

            </div>

        </div>
  </div>
</template>
<style scoped lang="stylus">
.talk-bar-main
  margin 40px
  height 90%
  padding 20px
  box-sizing border-box
  transition right 0.5s
  border-radius 10px
  box-shadow 0 0 3px 3px rgba(0, 0, 0, 0.2)
  background-color: var(--grey-color-dark)
  z-index 13

.talk-bar-shadow
  --animate-duration 0.5s
  position absolute
  height 100%
  width 100%
  background-color rgba(0, 0, 0, 0.8)
  top 0
  right 0
  transition opacity 0.5s
  z-index 12

.talk-input-area
  position relative
  height 100px
  width 100%
  padding 0 10px
  box-sizing border-box

.history-content
  padding-right 15px

.history
  padding 10px 0
  gap 10px

.content
  border-radius 10px
  overflow hidden
  padding 10px 10px
  max-width 70%
  text-align left
  user-select: text

.submit-button
  position absolute
  right 0
  bottom -20px
  width 50px

.sync
  color var(--grey-color)
  transition all 0.2s
  cursor pointer
  &:hover
    color var(--theme-color)
    .box-icon
      animation rotate360 2s infinite

.forbidden
  background-color var(--grey-color)
  cursor no-drop
  &:hover
    background-color var(--grey-color)
.input-field
  font-size 16px
  color var(--font-subject-color)
</style>
