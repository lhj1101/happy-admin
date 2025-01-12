import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  const env = loadEnv(mode, process.cwd())
  console.log('mode-env', mode, env);
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets')
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/handle.scss";',
        }
      }
    },
    server: {
      host: true,
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 生产环境移除 console
      minify: 'terser',
      terserOptions: {
        compress: {
          // drop_console: mode === 'production', // 生产环境移除 console
          // drop_debugger: mode === 'production' // 生产环境移除 debugger
        },
      },
    },
    optimizeDeps: {
      // 将频繁使用的包加入预构建
      include: ['vue', 'vue-router', 'pinia', 'axios'],
      // 排除不需要预构建的依赖
      exclude: [] 
    }
  }
})
