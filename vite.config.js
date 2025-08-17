import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.thesportsdb.com/api/v1/json/123", // API base
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // hapus "/api" depan
      },
    },
  },
})