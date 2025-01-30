import { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: ["../src/components/**/*.stories.?(ts|tsx|js|jsx)"],

  addons: ["@storybook/addon-essentials"],

  logLevel: "debug",

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      pluginReactOptions: {
        jsxRuntime: "automatic",
        jsxImportSource: "nativewind",
        babel: {
          plugins: [
            "react-native-web",
            "@babel/plugin-proposal-export-namespace-from",
            "react-native-reanimated/plugin",
          ],
        },
      },
    },
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen",
  },
};

export default main;
