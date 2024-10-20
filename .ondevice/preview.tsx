import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import { View } from "react-native";
import { addons } from "@storybook/preview-api";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    withBackgrounds,
    (Story, { parameters }) => {
      const [background, setBackground] = useState(
        parameters?.backgrounds?.find?.((b) => b.default)?.value || "",
      );

      const channel = addons.getChannel();

      useEffect(() => {
        channel.on("storybook-addon-background:update", setBackground);
        return () => {
          channel.removeListener(
            "storybook-addon-background:update",
            setBackground,
          );
        };
      }, [channel]);

      const { flexStart = false, padding = false } = parameters || {};

      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View
            //@ts-ignore
            className={`${padding ? "p-4" : ""} flex-1 ${
              flexStart ? "items-start" : ""
            }`}
            style={{ backgroundColor: background }}
          >
            <Story />
          </View>
        </GestureHandlerRootView>
      );
    },
  ],
  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "white", value: "white" },
        { name: "app", value: "#F5F6F7" },
        { name: "dark", value: "#2C2C2C" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      sort: "requiredFirst",
    },
  },
};

export default preview;
