/* eslint-disable @typescript-eslint/no-var-requires */
const rulesDirPlugin = require("eslint-plugin-rulesdir");
/* eslint-enable @typescript-eslint/no-var-requires */

rulesDirPlugin.RULES_DIR = "eslint-rules/dist";

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["rulesdir", "import", "unused-imports", "@typescript-eslint"],
  rules: {
    "sort-imports": "off",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: { order: "asc" },
      },
    ],
    "rulesdir/clean-arch": "error",
    "import/no-unresolved": ["error", { commonjs: true, amd: true }],

    // https://qiita.com/dhythm/items/b69c335b6d62b2eab2ab
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "warn",
  },
  extends: [
    "next/core-web-vitals",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
};
