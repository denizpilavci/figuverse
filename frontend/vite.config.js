import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Docker için gerekli (0.0.0.0)
    port: 5173,
    watch: {
      usePolling: true, // Docker üzerinde Windows'ta hot-reload için gerekli
    }
  }
})
