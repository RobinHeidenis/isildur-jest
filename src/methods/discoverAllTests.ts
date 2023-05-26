import { BaseTestSuite, PartialTestRunnerOptions } from "@isildur-testing/api";
import jest from "jest";
import { parseDiscoveredSuite } from "~/helpers/parseSuite.js";
import { WEIRD_JEST_DEFAULT_CONFIG } from "~/helpers/weirdJestDefaultConfig.js";
const { runCLI } = jest;

export const discoverAllTests = async (
  options?: PartialTestRunnerOptions
): Promise<BaseTestSuite[]> => {
  const mergedOptions = {
    ...WEIRD_JEST_DEFAULT_CONFIG,
    projects: [process.cwd()],
    config: options?.config,
    testNamePattern: "CrazyTestNameThatWillNeverMatchAnything",
  } satisfies Parameters<typeof runCLI>[0];

  const result = await runCLI(mergedOptions, mergedOptions.projects ?? []);

  return result.results.testResults.flatMap((suite) =>
    parseDiscoveredSuite(suite)
  );
};
