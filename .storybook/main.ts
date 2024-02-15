import { StorybookConfig } from "@storybook/react-webpack5";
const path = require("path");

type ServerStorybookConfig = StorybookConfig & {
  reactNativeServerOptions: { host: string; port: number };
};

const main: ServerStorybookConfig = {
  stories: [
    // "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.?(ts|tsx|js|jsx)",
  ],

  babel: async (options) => {
    return options;
  },

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [
          "react-native-reanimated",
          "react-native-vector-icons",
          "nativewind",
          "react-native-css-interop",
        ],
        babelPresets: ["nativewind/babel"],
        babelPresetReactOptions: { jsxImportSource: "nativewind" },
        babelPlugins: [
          // "@babel/plugin-proposal-export-namespace-from",
          ["@babel/plugin-transform-class-properties", { loose: true }],
          "react-native-reanimated/plugin",
        ],
      },
    },
    "@storybook/addon-react-native-server",
  ],

  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        },
      ],
      include: [
        path.resolve(__dirname, "../stories/nativewind"),
        path.resolve(__dirname, "./"),
      ],
    });
    return config;
  },

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
