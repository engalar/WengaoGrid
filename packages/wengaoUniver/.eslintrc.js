const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    plugins: ["jest"],
    ignorePatterns: [ "src/**/*.d.ts"]
};
