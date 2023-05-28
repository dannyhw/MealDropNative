require("@babel/register")({
  presets: ["babel-preset-expo"],
  plugins: ["nativewind/babel"],
  include: [
    "./src",
    "./script1.ts",
    "./node_modules/react-native",
    "./node_modules/nativewind",
  ],

  ignore: [/node_modules\/(?![react\-native|nativewind])/],
  extensions: [
    ".ios.js",
    ".android.js",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".es6",
    ".es",
    "cjs",
  ],
});
