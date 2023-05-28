import { PartialTestRunnerOptions, TestSuite } from "@isildur-testing/api";
import jest from "jest";
import { getJestOptions } from "~/helpers/getJestOptions";
import { parseRanSuite } from "~/helpers/parseSuite";
const { runCLI } = jest;

export const runAllTests = async (
  options?: PartialTestRunnerOptions
): Promise<TestSuite[]> => {
  const jestOptions = getJestOptions(options);
  const result = await runCLI(jestOptions, jestOptions.projects ?? []);

  return result.results.testResults.flatMap((suite) => parseRanSuite(suite));
};
