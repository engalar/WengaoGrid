/* eslint-disable n/no-missing-import */
/* eslint-disable import/no-nodejs-modules */
import { existsSync } from "fs";
import path, { join } from "path";
import loadConfigFile from "rollup/dist/loadConfigFile";
import { univerPlugin } from "@univerjs/vite-plugin";
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
    const result = args.configDefaultConfig;
    for (let index = 0; index < result.length; index++) {
        const cfg = result[index];
        cfg.plugins.splice(0, 0, json(), univerPlugin());
        //file path cfg.output.file, get its dir path string
        cfg.output.dir = path.dirname(cfg.output.file);
        delete cfg.output.file;
    }
}
