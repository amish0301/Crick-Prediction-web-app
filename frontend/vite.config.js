import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer(), tailwindcss()],
  build: {
    minify: "esbuild", // Ensure ESBuild is used for minification
  },
});
