module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindFunctions: ["tv"],
  tailwindAttributes: ["className", "containerStyle", "tw", "^[a-z]+Style$"],
};
