import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { tv } from "tailwind-variants";

interface ButtonProps extends TouchableOpacityProps {
  clear?: boolean;
  large?: boolean;
  withIcon?: boolean;
  disabled?: boolean;
  round?: boolean;
  text: string;
}

const touchableClasses = tv({
  base: "items-center justify-center",
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

const buttonTextClasses = tv({
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
    <TouchableOpacity
      accessibilityRole="button"
      className={touchableClasses({ clear, disabled, large, withIcon, round })}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text
        className={buttonTextClasses({
          clear,
        })}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
