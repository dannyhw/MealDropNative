import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {} from "react-native-gesture-handler";

export interface BottomSheetRef {
  present: () => void;
  dismiss: () => void;
}
const HEIGHT = Dimensions.get("window").height / 2;

export const BottomSheet = forwardRef(({}, ref: Ref<BottomSheetRef>) => {
  const visible = useRef(new Animated.Value(0)).current;

  // const [visible, setVisible] = useState(false);

  const present = () => {
    // setVisible(true);
    Animated.timing(visible, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const dismiss = () => {
    // setVisible(false);
    Animated.timing(visible, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({ present, dismiss }));

  return (
    <Animated.View
      style={{
        position: "absolute",
        backgroundColor: "#fff",
        height: HEIGHT,
        bottom: 0,
        right: 0,
        left: 0,
        padding: 40,

        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        transform: [
          {
            translateY: visible.interpolate({
              inputRange: [0, 1],
              outputRange: [HEIGHT, 0],
            }),
          },
        ],
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      }}
    >
      <TouchableOpacity onPress={dismiss}>
        <Text>close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({});
