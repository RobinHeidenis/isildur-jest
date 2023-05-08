import { TestSuite } from "@isildur-testing/api";
import jest from "jest";
const { runCLI } = jest;

export const runAllTests = async (): Promise<TestSuite[]> => {
  const options = {
    projects: [process.cwd()],
    silent: true,
    color: false,
    showConfig: true,
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
      duration: suite.perfStats.runtime ?? 0,
      numFailing: suite.numFailingTests,
      numPassing: suite.numPassingTests,
      numSkipped: suite.numPendingTests + suite.numTodoTests,
      tests: suite.testResults.map((testResult) => {
        if (testResult.status === "passed") {
          return {
            file,
            name: testResult.title,
            status: "pass",
            duration: testResult.duration ?? 0,
          };
        } else if (
          testResult.status === "pending" ||
          testResult.status === "todo"
        ) {
          return {
            file,
            name: testResult.title,
            status: "skipped",
            duration: testResult.duration ?? 0,
          };
        } else {
          return {
            file,
            name: testResult.title,
            status: "fail",
            duration: testResult.duration ?? 0,
            error: testResult.failureMessages.join("\n"),
          };
        }
      }),
    };
  });
};
