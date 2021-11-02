"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAndroid = void 0;
const path_1 = require("path");
const await_to_js_1 = __importDefault(require("await-to-js"));
const chalk_1 = __importDefault(require("chalk"));
const properties_reader_1 = __importDefault(require("properties-reader"));
const semver_1 = require("semver");
const utils_1 = require("./utils");
const appPropertiesPath = path_1.resolve(process.cwd(), "android/app/app.properties");
const generateVersionCode = (version) => {
    const [major, minor, patch] = version.split(".");
    return (parseInt(major) * 1000000) + (parseInt(minor) * 1000) + parseInt(patch);
};
const syncAndroid = async () => {
    const { version, build } = utils_1.readPackage(path_1.resolve(process.cwd(), "package.json"));
    if (!semver_1.valid(version)) {
        utils_1.log(chalk_1.default `  {red Invalid version: "${version}". Nothing to do.}`);
        process.exit();
    }
    const appProps = properties_reader_1.default(appPropertiesPath);
    const newVersionCode = generateVersionCode(version);
    appProps.set("versionCode", build);
    appProps.set("versionName", version);
    const [err] = await await_to_js_1.default(appProps.save(appPropertiesPath));
    if (err) {
        utils_1.log(chalk_1.default `  {red Failed to sync version ${err.message}}`);
        process.exit();
    }
    utils_1.log(chalk_1.default `{green ✔} Sync version ${version} for android.`);
};
exports.syncAndroid = syncAndroid;
