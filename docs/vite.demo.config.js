import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

module.exports = defineConfig({
  plugins: [vue()],

  root: 'docs',

  build: {
    watch: {},
    rollupOptions: {
      input: {
        bundle: 'docs/app.js'
      },
      output: {
        entryFileNames: "app.js",
        dir: './docs/resources'
      }
    },

    external: [
      'resources/tabs-component.css'
    ]
  }
})
