/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  testTimeout: 60000,
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
