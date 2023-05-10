import type { runCLI } from "jest";

export const transformDiscoveredSuite = (
  suite: Awaited<ReturnType<typeof runCLI>>["results"]["testResults"][0]
) => {
  return {
    file: suite.testFilePath,
    name:
      suite.displayName?.name ??
      suite.testResults[0]?.ancestorTitles[0] ??
      "unknown",
    suites: [],
    tests: suite.testResults.map((testResult) => {
      return {
        file: suite.testFilePath,
        name: testResult.title,
        duration: -1,
      };
    }),
  };
};
