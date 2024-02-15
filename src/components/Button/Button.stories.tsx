import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import Documentation from "./Documentation.mdx";

const meta = {
  title: "Button",
  component: Button,
  argTypes: {
    text: { control: "text" },
    disabled: { control: "boolean" },
    clear: { control: "boolean" },
    large: { control: "boolean" },
    withIcon: { control: "boolean" },
    round: { control: "boolean" },
  },
  parameters: { flexStart: true, padding: true },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "Button",
  },
};

export const Disabled: Story = {
  args: {
    text: "Button",
    disabled: true,
  },
};

export const Clear: Story = {
  args: {
    text: "Button",
    clear: true,
  },
};

// TODO: icon

export const Docs: Story = {
  render: () => <Documentation />,
  args: { text: "Button" },
  parameters: {
    deviceOnly: true,
  },
};
