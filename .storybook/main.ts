import { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: ["../src/components/**/*.stories.?(ts|tsx|js|jsx)"],

  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

  logLevel: "debug",

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default main;
