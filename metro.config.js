const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const defaultConfig = getDefaultConfig(__dirname);
const path = require("path");
const { generate } = require("@storybook/react-native/scripts/generate");
const { withNativeWind } = require("nativewind/metro");

generate({
  configPath: path.resolve(__dirname, "./.ondevice"),
});

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

defaultConfig.resolver.blockList = exclusionList([
  /screenshots\/.*/,
  /screenshots-diff\/.*/,
  /screenshots-base\/.*/,
]);

defaultConfig.watchFolders = [...defaultConfig.watchFolders, "./.ondevice"];

defaultConfig.resolver.sourceExts.push("md", "mdx");

defaultConfig.transformer.babelTransformerPath =
  require.resolve("./transformer.js");

defaultConfig.transformer.unstable_allowRequireContext = true;

module.exports = withNativeWind(defaultConfig, {
  input: "./.storybook/global.css",
});
