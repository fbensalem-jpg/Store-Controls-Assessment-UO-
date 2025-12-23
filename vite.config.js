import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Store-Controls-Assessment-UO-/',
  plugins: [react()],
  server: {
    port: 3000,
  },
})
