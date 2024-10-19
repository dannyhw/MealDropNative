import { StorybookConfig } from "@storybook/react-native-web-vite";
const path = require("path");

type ServerStorybookConfig = StorybookConfig & {
  reactNativeServerOptions: { host: string; port: number };
};

const main: ServerStorybookConfig = {
  stories: ["../src/components/**/*.stories.?(ts|tsx|js|jsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-react-native-server",
  ],

  logLevel: "debug",

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  reactNativeServerOptions: {
    host: "localhost",
    port: 7007,
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default main;
