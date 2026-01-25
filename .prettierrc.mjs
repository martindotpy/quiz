/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-organize-imports",
    "prettier-plugin-astro-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        tabWidth: 2,
        parser: "astro",
      },
    },
    {
      files: "*.json",
      options: {
        tabWidth: 2,
        parser: "json",
      },
    },
    {
      files: "*.md",
      options: {
        tabWidth: 2,
        parser: "markdown",
      },
    },
  ],
  semi: false,
  trailingComma: "es5",
  tailwindFunctions: ["tw", "cn", "clsx", "twMerge"],
}
