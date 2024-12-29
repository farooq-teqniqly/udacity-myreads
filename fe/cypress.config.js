import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS__APP_URL || "http://localhost:5173",
    setupNodeEvents() {},
  },
});
