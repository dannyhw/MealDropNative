import type { ComponentStoryObj, ComponentMeta } from "@storybook/react-native";
import Documentation from "./Documentation.mdx";
import { Category } from "./Category";

export default {
  title: "Category",
  component: Category,
  args: {
    title: "Pizza",
    photoUrl:
      "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550",
  },
  parameters: { padding: true },
} as ComponentMeta<typeof Category>;

export const Default: ComponentStoryObj<typeof Category> = {};

export const Rounded: ComponentStoryObj<typeof Category> = {
  args: {
    round: true,
  },
};

export const Docs: ComponentStoryObj<typeof Category> = {
  render: () => <Documentation />,
};
