import { StorybookConfig } from "@storybook/react-webpack5";

type ServerStorybookConfig = StorybookConfig & {
  reactNativeServerOptions: { host: string; port: number };
};

const main: ServerStorybookConfig = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.?(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
    "@storybook/addon-react-native-server",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  reactNativeServerOptions: {
    host: "localhost",
    port: 7007,
  },

  docs: {
    autodocs: false,
  },
};

export default main;
