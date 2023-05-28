import { styled } from "nativewind";
import { Image, Text, View } from "react-native";
import { tv } from "tailwind-variants";

interface CategoryProps {
  photoUrl: string;
  title: string;
  round: boolean;
}

const containerClasses = tv({
  base: "flex rounded w-full h-full m-w-[50px] relative",
  variants: {
    round: {
      true: "flex-column items-center justify-center bg-card max-w-[200] max-h-[200] py-6 px-8",
      false: "flex-row items-start bg-transparent max-h-[309px]",
    },
  },
});

const imgClasses = tv({
  variants: {
    round: {
      true: "rounded-full w-24 h-24",
      false: "rounded w-full h-full min-w-[50px] min-h-[50px] max-h-[300px]",
    },
  },
});

const titleClasses = tv({
  variants: {
    round: {
      true: "text-primary",
      false: "text-white",
    },
  },
});

const titleContainerClasses = tv({
  variants: {
    round: {
      true: "pt-4",
      false: "absolute top-6 left-6 rounded bg-other-black py-2 px-4",
    },
  },
});

export const Category = ({ photoUrl, round = false, title }: CategoryProps) => {
  return (
    <View className={containerClasses({ round })}>
      <Image
        className={imgClasses({ round })}
        source={{ uri: photoUrl }}
        resizeMode="cover"
      />
      <View className={titleContainerClasses({ round })}>
        <Text className={titleClasses({ round })}>{title}</Text>
      </View>
    </View>
  );
};
