import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: './build'
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3500,
  },
})
