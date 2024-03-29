import type { ComponentMeta, ComponentStoryObj } from "@storybook/react-native";

import { Badge } from "./Badge";
import Documentation from "./Documentation.mdx";

export default {
  title: "Badge",
  component: Badge,
  parameters: { flexStart: true, padding: true },
} as ComponentMeta<typeof Badge>;

export const Basic: ComponentStoryObj<typeof Badge> = {
  args: {
    text: "Badge",
  },
};

export const Docs: ComponentStoryObj<typeof Badge> = {
  render: () => <Documentation />,
};
