import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 50000,
  },
  base: '/',
  define: {
    'process.env': {},
  }/*
  ,
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://ata-dev01:44318',
        changeOrigin: true,
        secure: false,
      },
    },
  }
  */
})
