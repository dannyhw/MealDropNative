import { Meta, StoryObj } from "@storybook/react";

import { BottomSheet, BottomSheetRef } from "./BottomSheet";
import { Text, TouchableOpacity, View } from "react-native";
import { useRef } from "react";

const meta = {
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

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
