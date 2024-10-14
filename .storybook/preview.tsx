import { Preview } from "@storybook/react";
import "./global.css";
import { View } from "react-native";

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
    (Story) => {
      return (
        <View>
          <Story />
        </View>
      );
    },
  ],
};

export default preview;
