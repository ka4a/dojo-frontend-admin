const { createConfig } = require("@edx/frontend-build");

module.exports = createConfig("jest", {
  setupFilesAfterEnv: ["<rootDir>/src/setupTest.js"],
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx}",
  ],
  "transform": {
    "\\.[j]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
});
