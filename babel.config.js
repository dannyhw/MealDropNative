module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      ["babel-plugin-react-docgen-typescript", { exclude: "node_modules" }],
    ],
  };
};
