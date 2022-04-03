const rulesDirPlugin = require('eslint-plugin-rulesdir')
rulesDirPlugin.RULES_DIR = 'eslint-rules/dist'

module.exports = {
  plugins: [
    'rulesdir',
    'import',
    'unused-imports',
  ],
  rules: {
    'rulesdir/clean-arch': 'error',
    'import/no-unresolved': ['error', { commonjs: true , amd: true }],
  },
  extends: [
    "next/core-web-vitals",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
  ],
}
