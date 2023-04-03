const { getDefaultConfig } = require("expo/metro-config");
const withNativewind = require("nativewind/metro");
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields = [
  "sbmodern",
  ...defaultConfig.resolver.resolverMainFields,
];

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

defaultConfig.watchFolders = [...defaultConfig.watchFolders, "./.ondevice"];

module.exports = withNativewind(defaultConfig);
