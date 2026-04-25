import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-tesouro': {
        target: 'https://www.tesourodireto.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-tesouro/, ''),
        secure: false,
      },
    },
  },
})
