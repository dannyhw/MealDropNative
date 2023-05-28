module.exports = {
  stories: ["../src/components/**/*.stories.?(ts|tsx|js|jsx)"],
  logLevel: "debug",
  env: () => ({}),
  core: {
    builder: "webpack5",
  },
  addons: ["@storybook/addon-essentials"],
};
