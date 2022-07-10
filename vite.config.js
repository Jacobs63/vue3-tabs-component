import { defineConfig } from 'vite'
const path = require('path')
import vue from '@vitejs/plugin-vue'

module.exports = defineConfig({
  plugins: [vue()],

  build: {
    watch: {},
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueTabs',
      fileName: (format) => `vue3-tabs-component.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
