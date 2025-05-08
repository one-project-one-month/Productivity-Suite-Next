import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintDrizzle from "eslint-plugin-drizzle";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      drizzle: eslintDrizzle,
    },
    rules: {
      ...eslintDrizzle.configs.all.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      quotes: [
        "error",
        "double",
        {
          allowTemplateLiterals: true,
        },
      ],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
    },
  },
];

export default eslintConfig;
