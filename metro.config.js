const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
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

defaultConfig.resolver.blockList = exclusionList([
  /screenshots\/.*/,
  /screenshots-diff\/.*/,
  /screenshots-base\/.*/,
]);

defaultConfig.watchFolders = [...defaultConfig.watchFolders, "./.ondevice"];

module.exports = defaultConfig;
