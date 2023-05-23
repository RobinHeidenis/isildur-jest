import { BaseTestSuite, TestSuite } from "@isildur-testing/api";
import { runCLI } from "jest";
import {
  transformDiscoveredSuiteFileMap,
  transformRanSuiteFileMap,
} from "~/helpers/transformSuite";

export type TestResults = Awaited<
  ReturnType<typeof runCLI>
>["results"]["testResults"][number];

const createFileMap = (
  suite: TestResults
): Map<string, { tests: TestResults["testResults"][number][] }> => {
  const fileMap = new Map<
    string,
    { tests: TestResults["testResults"][number][] }
  >();

  suite.testResults.forEach((test) => {
    if (!fileMap.has(suite.testFilePath)) {
      fileMap.set(suite.testFilePath, { tests: [test] });
      return;
    }
    fileMap.get(suite.testFilePath)?.tests.push(test);
  });

  return fileMap;
};

export const parseDiscoveredSuite = (suite: TestResults): BaseTestSuite[] => {
  return transformDiscoveredSuiteFileMap(createFileMap(suite));
};

export const parseRanSuite = (suite: TestResults): TestSuite[] => {
  return transformRanSuiteFileMap(createFileMap(suite));
};
