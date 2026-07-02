// Note: Code made using Claude AI
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Detect if running in WSL by checking for /proc/version
const isWSL = fs.existsSync('/proc/version') &&
  fs.readFileSync('/proc/version', 'utf-8').toLowerCase().includes('microsoft')

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: isWSL,
      interval: 200,
    },
  },
})
