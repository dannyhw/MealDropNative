import { getStorybookUI } from "@storybook/react-native";
import "./doctools";
import "./storybook.requires";
import { SafeAreaView } from "react-native";

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
  onDeviceUI: false,
});

const StorybookUI = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <StorybookUIRoot />
  </SafeAreaView>
);

export default StorybookUI;
