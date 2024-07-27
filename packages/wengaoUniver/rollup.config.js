/* eslint-disable n/no-missing-import */
/* eslint-disable import/no-nodejs-modules */
import { existsSync } from "fs";
import { join, dirname, basename, extname } from "path";
import loadConfigFile from "rollup/dist/loadConfigFile";
import json from "@rollup/plugin-json";

const sourcePath = process.cwd();

export default async args => {
    await _loadCustomConfig(args);
    const result = args.configDefaultConfig;
    const customConfigPath = join(sourcePath, "rollup.config.typing.js");
    if (!!process.env.__DEV_VITEJS__ && existsSync(customConfigPath)) {
        const customConfig = await loadConfigFile(customConfigPath, { ...args, configDefaultConfig: result });
        customConfig.warnings.flush();
        return customConfig.options;
    } else {
        return result;
    }
};

async function _loadCustomConfig(args) {
    // Your custom config loading logic here
    //...
    function externalPatch(cfg) {
        cfg.external.push(...[
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
        ]);
        cfg.output.globals = {
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
        };
    }
    function chunkPatch(cfg) {
        cfg.plugins.unshift(json());
        cfg.output.dir = dirname(cfg.output.file);
        // get file name from full path
        const fileName = basename(cfg.output.file);
        // set entry file name to [name].js
        cfg.output.entryFileNames = fileName;
        cfg.output.chunkFileNames = `chunks/[name]-[hash].${extname(fileName)}`;
        delete cfg.output.file;
    }
    args.configDefaultConfig.forEach(cfg => {
        const fileName = basename(cfg.output.file);
        if (fileName.endsWith(".editorConfig.js") || fileName.endsWith(".editorPreview.js")) {
            return;
        }
        // externalPatch(cfg);
        chunkPatch(cfg);
    });
}
