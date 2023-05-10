import { BaseTestSuite } from "@isildur-testing/api";
import jest from "jest";
const { runCLI } = jest;

export const discoverAllTests = async (): Promise<BaseTestSuite[]> => {
  const options = {
    projects: [process.cwd()],
    silent: true,
    color: false,
    testNamePattern: "CrazyTestNameThatWillNeverMatchAnything",
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const result = await runCLI(options, options.projects);

  return result.results.testResults.map((suite) => {
    const file = suite.testFilePath;

    return {
      file,
      name:
        suite.displayName?.name ??
        suite.testResults[0]?.ancestorTitles[0] ??
        "unknown",
      suites: [],
      tests: suite.testResults.map((testResult) => {
        return {
          file,
          name: testResult.title,
          duration: -1,
        };
      }),
    };
  });
};
