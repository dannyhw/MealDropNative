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

  babelDefault: async (options) => {
    return options;
  },

  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-server",
    // {
    //   name: "@storybook/addon-styling-webpack",
    //   options: {
    //     rules: [
    //       // Replaces existing CSS rules to support PostCSS
    //       {
    //         test: /\.css$/,
    //         use: [
    //           "style-loader",
    //           {
    //             loader: "css-loader",
    //             options: { importLoaders: 1 },
    //           },
    //           {
    //             // Gets options from `postcss.config.js` in your project root
    //             loader: "postcss-loader",
    //             options: { implementation: require.resolve("postcss") },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [
          "react-native-reanimated",
          "react-native-vector-icons",
          "nativewind",
          "react-native-css-interop",
        ],
        // babelPresets: ["nativewind/babel"],
        babelPresetReactOptions: {
          jsxImportSource: "nativewind",
          // runtime: "automatic",
        },
        babelPlugins: [
          "@babel/plugin-proposal-export-namespace-from",
          ["@babel/plugin-transform-class-properties", { loose: true }],
          "react-native-reanimated/plugin",
        ],
      },
    },
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
        path.resolve(__dirname, "preview.tsx"),
        path.resolve(__dirname, "../src/"),
      ],
    });
    return config;
  },

  logLevel: "debug",

  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true,
    },
  },

  reactNativeServerOptions: {
    host: "localhost",
    port: 7007,
  },

  // docs: {},

  // typescript: {
  //   reactDocgen: "react-docgen-typescript",
  // },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      // @ts-ignore
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      compilerOptions: {
        jsxImportSource: "nativewind",
      },
      include: ["../src/**/*.ts", "../src/**/*.tsx"],
    },
  },
  // typescript: {
  //   reactDocgen: false,
  // },
};

export default main;
