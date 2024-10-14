import { Text, View } from "react-native";

interface BadgeProps {
  text: string;
  className?: string;
}

export const Badge = ({ text, className }: BadgeProps) => {
  return (
    <View className="rounded bg-badge px-2 py-[3px]">
      <Text className={`capitalize text-badge ${className}`}>{text}</Text>
    </View>
  );
};
