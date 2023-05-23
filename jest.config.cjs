const { pathsToModuleNameMapper } = require("ts-jest");
const compilerOptions = require("./tsconfig.json");

const jestConfig = {
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "node",
  roots: ["."],
  modulePaths: [compilerOptions.compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  collectCoverage: true,
};

module.exports = jestConfig;
