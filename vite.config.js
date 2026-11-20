import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Netlify serves from the domain root, so base is '/'.
export default defineConfig({ base: '/', plugins: [react()] })
