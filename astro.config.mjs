import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  integrations: [db(), react()],
  vite: {
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client"],
    },
  },
});