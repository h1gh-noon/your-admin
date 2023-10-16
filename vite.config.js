import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 读取环境变量
  const { VITE_BASE_URL: base } = loadEnv(mode, process.cwd())
  return {
    base,
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true
          // rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [BootstrapVueNextResolver()]
      }),
      createSvgIconsPlugin({ // svg插件 自动加载此目录下的svg
        iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteCompression({ // gzip压缩 须在nginx中配置
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    build: {
      minify: 'terser', // 使用terser 去除生产环境的console debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      sourcemap: false // 关闭sourcemap
    },
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
  }
})
