module.exports = {
    moduleNameMapper: {
        "src/(.*)": "<rootDir>/src/$1",
    },
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
    testEnvironment: 'jsdom'
}