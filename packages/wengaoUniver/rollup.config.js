/* eslint-disable n/no-missing-import */
/* eslint-disable import/no-nodejs-modules */
import { existsSync } from "fs";
import { join, dirname, basename, extname } from "path";
import loadConfigFile from "rollup/dist/loadConfigFile";
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
    args.configDefaultConfig.forEach(cfg => {
        cfg.output.dir = dirname(cfg.output.file);
        // get file name from full path
        const fileName = basename(cfg.output.file);
        // set entry file name to [name].js
        cfg.output.entryFileNames = fileName;
        cfg.output.chunkFileNames = `chunks/[name]-[hash].${extname(fileName)}`;
        delete cfg.output.file;
    });
}
