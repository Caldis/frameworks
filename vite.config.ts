import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-router')) return 'vendor'
          if (id.includes('node_modules/react-dom')) return 'vendor'
          if (id.includes('node_modules/react/')) return 'vendor'
          if (id.includes('node_modules/recharts')) return 'charts'
          if (id.includes('node_modules/d3')) return 'd3'
          if (id.includes('data/frameworks/')) return 'framework-data'
        },
      },
    },
  },
})
