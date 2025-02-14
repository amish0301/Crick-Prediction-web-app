import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), visualizer(), tailwindcss()],
  build: {
    minify: "esbuild", // Ensure ESBuild is used for minification
  },
});
