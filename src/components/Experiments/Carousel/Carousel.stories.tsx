import { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";
import { View } from "react-native";

const meta = {
  title: "Experiments/Carousel",
  component: Carousel,
  decorators: [
    (Story) => {
      return (
        <View className="max-w-full overflow-hidden">
          <Story />
        </View>
      );
    },
  ],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
