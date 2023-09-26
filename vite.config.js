import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/youradmin',
  server: {
    proxy: {
      '/jsp1_war': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
        // rewrite: path => path.replace(/^\/jsp1_war/, '')
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style.scss";'
      }
    }
  }
})
