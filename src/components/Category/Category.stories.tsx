import type { StoryObj, Meta } from "@storybook/react";
import Documentation from "./Documentation.mdx";
import { Category } from "./Category";

const meta = {
  title: "Category",
  component: Category,
  args: {
    title: "Pizza",
    photoUrl:
      "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550",
  },
  parameters: { padding: true, layout: "fullscreen" },
} satisfies Meta<typeof Category>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rounded: Story = {
  args: {
    round: true,
  },
};

export const Docs: Story = {
  parameters: {
    deviceOnly: true,
    padding: false,
  },
  render: () => {
    return <Documentation />;
  },
};
