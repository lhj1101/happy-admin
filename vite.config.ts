import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src') // @代替src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/styles/constant.scss";',
        additionalData: '@import "@/styles/handle.scss";',
      }
    }
  },
  server: {
    port: 3000, // 设置服务器端口
    open: true, // 自动打开浏览器
    proxy: {
      '/dev': {
        target: 'http://www.novlyb.com', // 你的后端 API 地址
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/dev/, '')
      }
    }
  }
})
