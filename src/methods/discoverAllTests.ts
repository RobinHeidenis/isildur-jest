import { BaseTestSuite, PartialTestRunnerOptions } from "@isildur-testing/api";
import jest from "jest";
import { getJestOptions } from "~/helpers/getJestOptions";
import { parseDiscoveredSuite } from "~/helpers/parseSuite";
const { runCLI } = jest;

export const discoverAllTests = async (
  options?: PartialTestRunnerOptions
): Promise<BaseTestSuite[]> => {
  const jestOptions = getJestOptions(options);
  const result = await runCLI(
    {
      ...jestOptions,
      testNamePattern: "crazyTestNamePatternThatWillNeverMatchAnything", // This is the only way to ensure no tests get executed, but we still get the discovered tests
    },
    jestOptions.projects ?? []
  );

  return result.results.testResults
    .flatMap((suite) => parseDiscoveredSuite(suite))
    .sort((a, b) => {
      if (a.file < b.file) {
        return -1;
      } else if (a.file > b.file) {
        return 1;
      }
      return 0;
    }); // ensure the suites are sorted to increase resiliancy in tests
};
