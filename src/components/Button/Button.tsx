import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styled } from "nativewind";

interface ButtonProps extends TouchableOpacityProps {
  clear: boolean;
  large: boolean;
  withIcon: boolean;
  disabled: boolean;
  round: boolean;
  text: string;
}

const Touchable = styled(TouchableOpacity, "items-center justify-center", {
  variants: {
    clear: {
      true: "bg-button-clear",
      false: "bg-button-primary",
    },
    large: {
      true: "py-5 px-4",
      false: "",
    },
    round: {
      true: "rounded-3xl",
      false: "rounded",
    },
    withIcon: {
      true: "p-3",
      false: "",
    },
    disabled: {
      true: "opacity-40",
      false: "",
    },
  },
  compoundVariants: [
    {
      large: false,
      withIcon: false,
      className: "py-3.5 px-4",
    },
  ],
});

const ButtonText = styled(Text, "", {
  variants: {
    clear: {
      true: "text-primary",
      false: "text-button",
    },
  },
});

export const Button = ({
  children,
  text,
  clear = false,
  disabled = false,
  large = false,
  withIcon = false,
  round = false,
  ...props
}: ButtonProps) => {
  return (
    <Touchable
      {...{ clear, disabled, large, withIcon, round }}
      activeOpacity={0.7}
      {...props}
    >
      <ButtonText {...{ clear, disabled, large, withIcon, round }}>
        {text}
      </ButtonText>
    </Touchable>
  );
};
