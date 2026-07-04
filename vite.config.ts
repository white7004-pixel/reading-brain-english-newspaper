import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' so the built app also works on GitHub Pages / subpath hosting
export default defineConfig({
  plugins: [react()],
  base: './',
})
