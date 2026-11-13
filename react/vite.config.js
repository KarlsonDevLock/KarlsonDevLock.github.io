import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: "./" keeps every asset URL relative, so the same build works at
// the domain root and inside a sub-folder such as GitHub Pages /react/.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    // Keep hashed JS/CSS out of /assets so the copied public assets folder
    // stays exactly the same as the original site.
    assetsDir: "static",
  },
  server: {
    port: 5173,
  },
});
