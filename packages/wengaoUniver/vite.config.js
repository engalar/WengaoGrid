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
        include: ["react/jsx-runtime", "react-dom", "scheduler", "dayjs"],
        exclude: [
            "@univerjs/core",
            "@univerjs/design",
            "@univerjs/docs",
            "@univerjs/docs-ui",
            "@univerjs/engine-formula",
            "@univerjs/engine-render",
            "@univerjs/facade",
            "@univerjs/network",
            "@univerjs/rpc",
            "@univerjs/sheets",
            "@univerjs/sheets-formula",
            "@univerjs/sheets-numfmt",
            "@univerjs/sheets-ui",
            "@univerjs/ui"
        ]
    },
    build: {
        rollupOptions: {
            external: [
                "@univerjs/core",
                "@univerjs/design",
                "@univerjs/docs",
                "@univerjs/docs-ui",
                "@univerjs/engine-formula",
                "@univerjs/engine-render",
                "@univerjs/facade",
                "@univerjs/network",
                "@univerjs/rpc",
                "@univerjs/sheets",
                "@univerjs/sheets-formula",
                "@univerjs/sheets-numfmt",
                "@univerjs/sheets-ui",
                "@univerjs/ui"
            ],
            output: {
                globals: {
                    "@univerjs/core": "UniverCore",
                    "@univerjs/design": "UniverDesign",
                    "@univerjs/docs": "UniverDocs",
                    "@univerjs/docs-ui": "UniverDocsUi",
                    "@univerjs/engine-formula": "UniverEngineFormula",
                    "@univerjs/engine-render": "UniverEngineRender",
                    "@univerjs/facade": "UniverFacade",
                    "@univerjs/network": "UniverNetwork",
                    "@univerjs/rpc": "UniverRpc",
                    "@univerjs/sheets": "UniverSheets",
                    "@univerjs/sheets-formula": "UniverSheetsFormula",
                    "@univerjs/sheets-numfmt": "UniverSheetsNumfmt",
                    "@univerjs/sheets-ui": "UniverSheetsUi",
                    "@univerjs/ui": "UniverUi"
                }
            }
        }
    },
    plugins: [
        univerPlugin(),
        isTest
            ? null
            : vitePluginMendix({
                  widgetName: widgetPackageJson.widgetName,
                  widgetPackage: widgetPackageJson.packagePath,
                  testProject: widgetPackageJson.config.projectPath,
                  isReactClient: false
              })
    ]
});
