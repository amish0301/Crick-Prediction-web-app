import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), visualizer(), tailwindcss()],
  build: {
    minify: "esbuild", // Ensure ESBuild is used for minification
  },
  // server:{
  //   host:'localhost',
  //   port:5173,
  //   hmr:{
  //     host: '722a-2401-4900-8898-5c2f-ce3-3ca1-3d9a-1f46.ngrok-free.app', // HMR over ngrok
  //     protocol: 'http',// HMR over HTTPS
  //   }
  // }
});
