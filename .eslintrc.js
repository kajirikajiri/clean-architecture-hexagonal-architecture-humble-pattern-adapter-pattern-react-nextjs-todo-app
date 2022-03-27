const rulesDirPlugin = require('eslint-plugin-rulesdir')
rulesDirPlugin.RULES_DIR = 'eslint-rules/dist'

module.exports = {
  plugins: [
    'rulesdir'
  ],
  rules: {
    'rulesdir/clean-arch': 'error',
  },
  extends: ["next/core-web-vitals"],
}
