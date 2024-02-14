import { Meta, StoryObj } from "@storybook/react";

import { CarouselSwipe } from "./CarouselSwipe";

const meta = {
  title: "Experiments/CarouselSwipe",
  component: CarouselSwipe,
} satisfies Meta<typeof CarouselSwipe>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {},
};
