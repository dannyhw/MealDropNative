module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.?(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },

  docs: {
    autodocs: true
  }
};
