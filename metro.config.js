const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const defaultConfig = getDefaultConfig(__dirname);
const path = require("path");
const withStorybook = require("@storybook/react-native/metro/withStorybook");
const { withNativeWind } = require("nativewind/metro");

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

module.exports = withStorybook(
  withNativeWind(defaultConfig, {
    input: "./.storybook/global.css",
  }),
  {
    configPath: path.resolve(__dirname, ".ondevice"),
    websockets: {
      port: 7007,
      host: "localhost",
    },
  },
);
