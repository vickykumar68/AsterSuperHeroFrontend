import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/super-hero-power-project/',
  server: {
    proxy: {
      '/api/v1/superhero': {
        // target: 'http://localhost:3000',
        target: 'https://asteradmin.stldigitaltech.com:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
