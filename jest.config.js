const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "/src",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
