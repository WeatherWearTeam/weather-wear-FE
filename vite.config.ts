import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@shared", replacement: "/src/shared" },
      { find: "@axios", replacement: "/src/axios" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@", replacement: "/src" },
    ],
  },
});
