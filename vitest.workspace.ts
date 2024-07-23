import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/wengao*/vitest.config.ts",
  {
    test: {
      environment: "jsdom",
    },
  },
]);
