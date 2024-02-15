import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";
import Documentation from "./Documentation.mdx";

const meta = {
  title: "Badge",
  component: Badge,
  parameters: { flexStart: true, padding: true },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "Badge",
  },
};

export const Docs: Story = {
  render: () => <Documentation />,
  args: { text: "Badge" },
  parameters: {
    deviceOnly: true,
  },
};
