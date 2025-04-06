import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: "custom-start-message",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          const address = server.httpServer.address();
          const protocol = server.config.server.https ? "https" : "http";
          const host = "localhost";
          const port = address.port;

          console.log("\n=== Meu Servidor Customizado ===");
          console.log(`🌐 Local: ${protocol}://${host}:${port}/`);
          console.log("🌐 Network: Use --host para expor na rede");
          console.log("🔧 Vue DevTools: Pressione Alt+Shift+D para abrir");
          console.log("===============================\n");
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
