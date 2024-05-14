import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    strictPort: true,
    host: true,
    proxy: {
      "/api": {
        target: `${process.env.VITE_API_SERVER}:${process.env.VITE_API_PORT}`,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
