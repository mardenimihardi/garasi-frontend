import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_'); // Hanya baca variabel yang diawali VITE_

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    define: {
      'import.meta.env': JSON.stringify(env), // Paksa variabel masuk ke import.meta.env
    },
  }
})
