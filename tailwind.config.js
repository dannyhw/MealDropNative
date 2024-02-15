const baseColors = {
  white: "#FFFFFF ",
  black: "#202020",
  "other-black": "#2C2C2C",
  primary: {
    50: "#E5F8BC",
    100: "#E8F9C3",
    200: "#EAF9C9",
    300: "#EDFAD0",
    400: "#EFFBD7",
    500: "#F2FCDE",
    600: "#CEDFA9",
    700: "#B7C696",
    800: "#A0AE84",
    900: "#899571",
    1000: "#737C5E",
  },
  secondary: {
    50: "#B1DDE4",
    100: "#B9E0E7",
    200: "#C1E4E9",
    300: "#C8E7EC",
    400: "#D0EBEF",
    500: "#D8EEF2",
    600: "#9FC7CD",
    700: "#8EB1B6",
    800: "#7C9BA0",
    900: "#6A8589",
    1000: "#596f72",
  },
  greys: {
    50: "#909090",
    100: "#A6A6A6",
    200: "#BCBCBC",
    300: "#D2D2D2",
    400: "#E9E9E9",
    500: "#F5F6F7",
    600: "#F9F9F9",
    700: "#797979",
    800: "#636363",
    900: "#4D4D4D",
    1000: "#363636",
    1100: "#2C2C2C",
    1200: "#202020",
  },
};

const textColor = {
  accent: baseColors.black,
  badge: baseColors.greys["800"],
  "cart-button": baseColors.greys["50"],
  button: baseColors.white,
  primary: baseColors["other-black"],
  review: baseColors.secondary["1000"],
};

const colors = {
  badge: baseColors.greys["400"],

  banner: baseColors.secondary["50"],
  "button-clear": "transparent",
  "button-clear-hover": baseColors.greys["500"],
  "button-primary": baseColors.greys["1200"],
  "button-primary-hover": baseColors.greys["1100"], // recheck
  "button-secondary": baseColors.primary["50"],
  "button-secondary-hover": baseColors.primary["600"], // recheck

  card: baseColors.greys["600"],
  "checkout-top": baseColors.primary["50"],
  "checkout-bottom": baseColors.greys["600"],
  form: baseColors.white,
  "food-item": baseColors.white,
  footer: baseColors.greys["1100"],
  header: baseColors.white,
  "restaurant-detail": baseColors.white,
  "header-border": baseColors.greys["400"],
  input: baseColors.greys["500"],
  "input-hint": baseColors.greys["700"],
  "input-icon": baseColors.greys["1200"],
  label: baseColors.greys["1000"],
  "label-active": baseColors.greys["1200"],
  "menu-section": baseColors.greys["600"],
  "steps-indicator-inner-bar": baseColors.greys["1200"],
  "steps-indicator-outer-bar": baseColors.greys["500"],
  "order-summary": baseColors.white,
  overlay: baseColors.white,
  "overlay-header": baseColors.greys["500"],

  screen: baseColors.white,
  "sidebar-header": baseColors.greys["1000"],
  "sidebar-footer": baseColors.white,
  "skeleton-base": baseColors.greys["400"],
  "skeleton-highlight": baseColors.greys["500"],
  "top-banner": baseColors.primary["50"],
  "new-restaurant-tag": baseColors.primary["50"],
  white: baseColors.white,
  black: baseColors.black,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.ondevice/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        body: "1.125rem",
        bodyS: "1rem",
        bodyXS: "0.9rem",
        bodyXXS: "0.72rem",
        heading1: "2.74rem",
        heading2: "2.19rem",
        heading3: "1.75rem",
        heading4: "1.4rem",
      },
      colors: {
        ...baseColors,
        ...colors,
      },
      textColor,
    },
  },
  plugins: [],
};
