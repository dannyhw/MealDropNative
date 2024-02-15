import { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

const meta = {
  title: "Experiments/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
