import { defineConfig } from "vite";
import vitePluginMendix from "@engalar/vite-plugin-mendix";
import { univerPlugin } from "@univerjs/vite-plugin";
import { join, resolve } from "node:path";
const sourcePath = process.cwd();
const widgetPackageJson = require(join(sourcePath, "package.json"));

const isTest = process.env.VITEST_VSCODE === "true";
// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ["react/jsx-runtime", "react-dom", "scheduler"]
    },
    plugins: [
        univerPlugin({
            css: false
        }),
        isTest
            ? null
            : vitePluginMendix({
                  widgetName: widgetPackageJson.widgetName,
                  widgetPackage: widgetPackageJson.packagePath,
                  testProject: widgetPackageJson.config.projectPath,
                  isReactClient: false
              })
    ],
    resolve: {
        alias: {
            "univer-lib": resolve(__dirname, "./univer/src/index.ts")
        }
    },
});
