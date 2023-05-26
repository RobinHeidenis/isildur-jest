import { BaseTestSuite, PartialTestRunnerOptions } from "@isildur-testing/api";
import jest from "jest";
import { getJestOptions } from "~/helpers/getJestOptions.js";
import { parseDiscoveredSuite } from "~/helpers/parseSuite.js";
const { runCLI } = jest;

export const discoverAllTests = async (
  options?: PartialTestRunnerOptions
): Promise<BaseTestSuite[]> => {
  const jestOptions = getJestOptions(options);
  const result = await runCLI(
    {
      ...jestOptions,
      testNamePattern: "crazyTestNamePatternThatWillNeverMatchAnything", // This is the only way to ensure no tests get executed, but we still get the discovered tests
      debug: true,
    },
    jestOptions.projects ?? []
  );

  return result.results.testResults.flatMap((suite) =>
    parseDiscoveredSuite(suite)
  );
};
