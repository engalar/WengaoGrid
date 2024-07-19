import { defineConfig } from "vite";
import vitePluginMendix from "@engalar/vite-plugin-mendix";
import { univerPlugin } from "@univerjs/vite-plugin";
import { join, resolve } from "path";
const sourcePath = process.cwd();
const widgetPackageJson = require(join(sourcePath, "package.json"));

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ["react/jsx-runtime", "react-dom", "scheduler"]
    },
    plugins: [
        univerPlugin({
            css: false
        }),
        vitePluginMendix({
            widgetName: widgetPackageJson.widgetName,
            widgetPackage: widgetPackageJson.packagePath,
            testProject: widgetPackageJson.config.projectPath,
            isReactClient: false
        })
    ],
    resolve: {
        alias: {
            "univer-lib": resolve(__dirname, "./univer/src/index.tsx")
        }
    }
});
