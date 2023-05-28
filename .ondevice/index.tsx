import { getStorybookUI } from "@storybook/react-native";
import "./doctools";
import "./storybook.requires";
import { SafeAreaView, StatusBar } from "react-native";

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
  onDeviceUI: false,
});

const StorybookUI = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar hidden />
    <StorybookUIRoot />
  </SafeAreaView>
);

export default StorybookUI;
