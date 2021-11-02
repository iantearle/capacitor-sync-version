"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncIos = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const plist_1 = __importDefault(require("plist"));
const semver_1 = require("semver");
const utils_1 = require("./utils");
const infoPlistPath = path_1.resolve(process.cwd(), "ios/App/App/Info.plist");
const syncIos = async () => {
    const { version, build } = utils_1.readPackage(path_1.resolve(process.cwd(), "package.json"));
    if (!semver_1.valid(version)) {
        utils_1.log(chalk_1.default `  {red Invalid version: "${version}". Nothing to do.}`);
        process.exit();
    }
    if (!semver_1.valid(build)) {
        utils_1.log(chalk_1.default `  {red Invalid version: "${build}". Nothing to do.}`);
        process.exit();
    }
    let content = fs_1.readFileSync(infoPlistPath, { encoding: "utf8" });
    const infoPlist = plist_1.default.parse(content);
    infoPlist.CFBundleShortVersionString = version;
    infoPlist.CFBundleVersion = build;
    content = plist_1.default.build(infoPlist);
    fs_1.writeFileSync(infoPlistPath, `${content}\n`, { encoding: "utf8" });
    utils_1.log(chalk_1.default `{green ✔} Sync version ${version} for ios.`);
};
exports.syncIos = syncIos;
