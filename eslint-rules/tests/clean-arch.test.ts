import { TSESLint } from '@typescript-eslint/experimental-utils'
import cleanArch from '../rules/clean-arch';

const tester = new TSESLint.RuleTester({
  parser: require.resolve("espree"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

describe("clean-arch rule test", () => {
  tester.run(`clean-arch`, cleanArch, {
    //
    valid: [
      {
        filename: "src/core/usecases/foo.ts",
        code: `import { FooModel } from 'core/domains/models/foo'`,
      },
    ],
    invalid: [
      {
        filename: "src/core/entities/foo.ts",
        code: `import { FooImpl } from 'core/usecases/foo'`,
        errors: [{ messageId: "cleanArch" }],
      },
    ],
  });
});