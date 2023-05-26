import { TestRunnerOptions, TestSuite } from "@isildur-testing/api";
import jest from "jest";
import { parseRanSuite } from "~/helpers/parseSuite.js";
import { WEIRD_JEST_DEFAULT_CONFIG } from "~/helpers/weirdJestDefaultConfig.js";
const { runCLI } = jest;

export const runAllTests = async (
  options?: TestRunnerOptions
): Promise<TestSuite[]> => {
  const mergedOptions = {
    ...WEIRD_JEST_DEFAULT_CONFIG,
    projects: [process.cwd()],
    config: options?.config,
  } satisfies Parameters<typeof runCLI>[0];

  const result = await runCLI(mergedOptions, mergedOptions.projects ?? []);

  return result.results.testResults.flatMap((suite) => parseRanSuite(suite));
};
