/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
    testTimeout: 20000,
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};