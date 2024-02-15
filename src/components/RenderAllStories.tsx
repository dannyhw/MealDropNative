import { Meta, StoryObj } from "@storybook/react";
import { Text, View } from "react-native";

export const RenderAllStories = ({
  StoryExports,
  Component,
}: {
  StoryExports: Record<string, StoryObj | Meta>;
  Component: React.ComponentType;
}) => {
  return (
    <>
      {Object.entries(StoryExports)
        .filter(([name, storyObj]) => !["default", "Docs"].includes(name))
        .map(([name, storyObj]) => (
          <View key={name} style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>
              {name}
            </Text>
            <Component
              {...{ ...StoryExports.default.args, ...storyObj.args }}
            />
          </View>
        ))}
    </>
  );
};
