import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Large media being copied in gets locked by Windows and crashes the watcher
    watch: { ignored: ['**/public/videos/**', '**/source-images/**'] },
  },
})
