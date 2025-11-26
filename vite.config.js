import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/reporte-taller-oct2025/', // Cambia esto por el nombre de tu repositorio
})