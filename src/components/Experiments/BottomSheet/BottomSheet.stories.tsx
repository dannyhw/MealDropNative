import { Meta } from "@storybook/react";

import { BottomSheet, BottomSheetRef } from "./BottomSheet";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useRef } from "react";

export default {
  title: "Experiments/BottomSheet",
  component: BottomSheet,
  render: (args) => {
    const bottomSheetRef = useRef<BottomSheetRef>(null);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Text>Open</Text>
          </TouchableOpacity>
        </View>

        <BottomSheet ref={bottomSheetRef} {...args} />
      </View>
    );
  },
} satisfies Meta<typeof BottomSheet>;

export const Basic = {
  args: {},
};
