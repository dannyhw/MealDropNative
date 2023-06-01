import { getStorybookUI } from "@storybook/react-native";
import "./doctools";
import "./storybook.requires";
import { SafeAreaView, StatusBar } from "react-native";

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
  onDeviceUI: true,
});

const StorybookUI = () => (
  // <SafeAreaView style={{ flex: 1 }}>
  // <StatusBar hidden />
  <StorybookUIRoot />
  // </SafeAreaView>
);

export default StorybookUI;
