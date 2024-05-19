
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";

import './assets/styles/index.css'
import "animate.css"
const app = createApp(App)

app.use(router)
    .use(store)

app.mount('#app')
