import { getStorybookUI } from "@storybook/react-native";
import "./doctools";
import "./storybook.requires";

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
});

export default StorybookUIRoot;
