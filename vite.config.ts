import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-element-admin/',
  build: {
    sourcemap: true,
    outDir: 'dist', //指定输出路径
    assetsDir: 'static/img/', // 指定生成静态资源的存放路径
    rollupOptions: {
      output: {
        /* manualChunks(id) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/')
            switch(arr[0]) {
              case '@popperjs':
              case '@vue':
              case 'axios':
              case 'element-plus':
              case 'vue3-tree-org':
                return '_' + arr[0]
                break
              default :
                return '__vendor'
                break
            }
          }
        }, */
        chunkFileNames: 'static/js1/[name]-[hash].js',
        entryFileNames: 'static/js2/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      },
    },
    // brotliSize: false, // 不统计
    target: 'esnext', 
    minify: 'esbuild' // 混淆器，terser构建后文件体积更小
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
