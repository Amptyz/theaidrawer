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
      '/ait':{
        target:'http://150.158.110.63:5000',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/ait/,'')
      }
    }
  }
})
