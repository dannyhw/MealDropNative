import { Preview } from "@storybook/react";
import "./global.css";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const { flexStart = false, padding = false, layout } = parameters || {};

      return (
        <View
          //@ts-ignore
          className={`flex flex-1
             ${padding ? "p-4" : ""}
             ${flexStart ? "items-start" : ""} 
             ${layout === "fullscreen" ? "h-screen w-screen" : ""}
          `}
        >
          <Story />
        </View>
      );
    },
  ],
};

export default preview;
