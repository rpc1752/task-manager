import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables for use in the config
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/tasks": {
          target: "http://localhost:8000",
          changeOrigin: true,
        },
      },
    },
    define: {
      // Pass API_URL to the frontend
      "import.meta.env.VITE_API_URL": JSON.stringify(env.API_URL || ""),
    },
  };
});
