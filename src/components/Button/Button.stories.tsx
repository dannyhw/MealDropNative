import type { ComponentMeta, ComponentStoryObj } from "@storybook/react-native";
import { Button } from "./Button";
import Documentation from "./Documentation.mdx";

export default {
  component: Button,
  argTypes: {
    text: { control: "text" },
    disabled: { control: "boolean" },
    clear: { control: "boolean" },
    large: { control: "boolean" },
    withIcon: { control: "boolean" },
    round: { control: "boolean" },
  },
  parameters: { flexStart: true },
} as ComponentMeta<typeof Button>;

export const Basic: ComponentStoryObj<typeof Button> = {
  args: {
    text: "Button",
  },
};

export const Disabled: ComponentStoryObj<typeof Button> = {
  args: {
    text: "Button",
    disabled: true,
  },
};

export const Clear: ComponentStoryObj<typeof Button> = {
  args: {
    text: "Button",
    clear: true,
  },
};

// TODO: icon

export const Docs: ComponentStoryObj<typeof Button> = {
  render: () => <Documentation />,
};
