import { styled } from "nativewind";
import { Image, Text, View } from "react-native";
import { tv } from "tailwind-variants";

interface CategoryProps {
  photoUrl: string;
  title: string;
  round?: boolean;
}

const containerClasses = tv({
  base: "m-w-[50px] relative flex h-full w-full rounded",
  variants: {
    round: {
      true: "flex-column max-h-[200] max-w-[200] items-center justify-center bg-card px-8 py-6",
      false: "max-h-[309px] flex-row items-start bg-transparent",
    },
  },
});

const imgClasses = tv({
  variants: {
    round: {
      true: "h-24 w-24 rounded-full",
      false: "h-full max-h-[300px] min-h-[50px] w-full min-w-[50px] rounded",
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
      false: "absolute left-6 top-6 rounded bg-other-black px-4 py-2",
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
