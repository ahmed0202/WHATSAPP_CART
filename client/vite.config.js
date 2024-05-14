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
        target: `${process.env.VITE_API_SERVER}`,
        changeOrigin: true,
        secure: false,
        onProxyReq(proxyReq, req, res) {
          // Add custom headers or modify existing headers if needed
          proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
        },
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
