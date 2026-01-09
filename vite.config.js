import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para evitar CORS con n8n
      '/api/n8n': {
        target: 'https://n8n-t.intelekta.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, '/webhook'),
        secure: false
      }
    }
  }
})
