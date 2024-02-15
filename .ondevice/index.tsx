import AsyncStorage from "@react-native-async-storage/async-storage";
import { view } from "./storybook.requires";
// import { SafeAreaView, StatusBar } from "react-native";

const StorybookUIRoot = view.getStorybookUI({
  enableWebsockets: true,
  onDeviceUI: true,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

// const StorybookUI = () => (
//   // <SafeAreaView style={{ flex: 1 }}>
//   // <StatusBar hidden />
//   <StorybookUIRoot />
//   // </SafeAreaView>
// );

export default StorybookUIRoot;
