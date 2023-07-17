import { View, Text, Dimensions, StyleProp, ViewStyle } from "react-native";
import React from "react";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 32;

const data = [
  { text: "1", color: "lightblue" },
  { text: "2", color: "pink" },
  { text: "3", color: "purple" },
];

const Card = ({
  text,
  color,
  style,
}: {
  text: string;
  color: string;
  style: StyleProp<ViewStyle>;
}) => (
  <Animated.View
    style={[
      {
        width: CARD_WIDTH,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
      },
      style,
    ]}
  >
    <Text>{text}</Text>
  </Animated.View>
);

export const Dot = ({
  active,
  i,
}: {
  i: number;
  active: Animated.SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(i === Math.round(active.value) ? 32 : 16),
      backgroundColor: i === Math.round(active.value) ? "red" : "grey",
    };
  });

  return (
    <Animated.View
      style={[
        {
          borderRadius: 16,

          height: 16,
        },
        animatedStyle,
      ]}
    />
  );
};

export function CarouselSwipe() {
  const index = useSharedValue(0);

  const offsetX = useDerivedValue(() => {
    return -index.value * CARD_WIDTH;
  }, [index]);

  const flingGestureRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      if (index.value > 0) index.value = withTiming(index.value - 1);
    });

  const flingGestureLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      if (index.value < 2) index.value = withTiming(index.value + 1);
    });

  const animatedStyle = useAnimatedStyle(() => {
    let clamped = offsetX.value;

    const limit = -CARD_WIDTH * 2;

    if (offsetX.value < limit) {
      clamped = limit;
    } else if (offsetX.value > 0) {
      clamped = 0;
    }

    return {
      transform: [{ translateX: clamped }],
    };
  }, [offsetX]);

  return (
    <View style={{}}>
      <GestureDetector
        gesture={Gesture.Exclusive(flingGestureLeft, flingGestureRight)}
      >
        <View style={{ flexDirection: "row" }}>
          {data.map((item) => (
            <Card
              key={item.text}
              text={item.text}
              color={item.color}
              style={animatedStyle}
            />
          ))}
        </View>
      </GestureDetector>

      <View style={{ flexDirection: "row", columnGap: 4 }}>
        {data.map((_, i) => (
          <Dot key={i} i={i} active={index} />
        ))}
      </View>
    </View>
  );
}
