import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    open: true,
    port: 8101,
    proxy:{
      '/api':{
        target:'http://124.221.139.189:8101',
        changeOrigin: true,
        rewrite:(path) => path.replace(/^\/api/,'')
      },
      '/talk':{
        target:'http://47.120.77.212:3000/js/iframe.js',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/talk/,'')
      }
    }
  }
})
