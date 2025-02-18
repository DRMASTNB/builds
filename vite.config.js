import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { // 对 css 的行为进行配置
    modules: { // 对 css 模块化的默认行为进行覆盖
      localsConvention: "camelCaseOnly"
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
})
