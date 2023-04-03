import { styled } from "nativewind";
import { Image, Text, View } from "react-native";

interface CategoryProps {
  photoUrl: string;
  title: string;
  round: boolean;
}

const Container = styled(
  View,
  "flex rounded w-full h-full m-w-[50px] relative",
  {
    variants: {
      round: {
        true: "flex-column items-center justify-center bg-card max-w-[200] max-h-[200] py-6 px-8",
        false: "flex-row items-start bg-transparent max-h-[309px]",
      },
    },
  }
);

const Img = styled(Image, "", {
  variants: {
    round: {
      true: "rounded-full w-24 h-24",
      false: "rounded w-full h-full min-w-[50px] min-h-[50px] max-h-[300px]",
    },
  },
});

const Title = styled(Text, "", {
  variants: {
    round: {
      true: "text-primary",
      false: "text-white",
    },
  },
});

const TitleContainer = styled(View, "", {
  variants: {
    round: {
      true: "pt-4",
      false: "absolute top-6 left-6 rounded bg-other-black py-2 px-4",
    },
  },
});

export const Category = ({ photoUrl, round = false, title }: CategoryProps) => {
  return (
    <Container round={round}>
      <Img round={round} source={{ uri: photoUrl }} resizeMode="cover" />
      <TitleContainer round={round}>
        <Title round={round}>{title}</Title>
      </TitleContainer>
    </Container>
  );
};
