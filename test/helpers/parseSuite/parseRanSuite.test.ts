import { TestSuite } from "@isildur-testing/api";
import { TestResults, parseRanSuite } from "~/helpers/parseSuite";

const emptyJestResults = {
  leaks: false,
  openHandles: [],
  numFailingTests: 0,
  numPassingTests: 0,
  numPendingTests: 0,
  numTodoTests: 0,
  perfStats: {
    end: 0,
    start: 0,
    runtime: 0,
    slow: false,
  },
  skipped: false,
  snapshot: {
    added: 0,
    fileDeleted: false,
    matched: 0,
    unchecked: 0,
    unmatched: 0,
    updated: 0,
    uncheckedKeys: [],
  },
  testFilePath: "test.ts",
  testResults: [],
  console: undefined,
  coverage: undefined,
  displayName: {
    color: "blue",
    name: "test.ts",
  },
  failureMessage: undefined,
  memoryUsage: 0,
  testExecError: undefined,
  v8Coverage: undefined,
} satisfies TestResults;

describe("parseRanSuite", () => {
  it("Should return an empty array when no results are given", () => {
    const suites = parseRanSuite(emptyJestResults);
    expect(suites).toEqual([]);
  });

  it("Should return a single suite when a single suite is given", () => {
    const suites = parseRanSuite({
      ...emptyJestResults,
      testResults: [
        {
          ancestorTitles: ["suite"],
          duration: 0,
          failureMessages: [],
          fullName: "suite test",
          numPassingAsserts: 0,
          status: "skipped",
          title: "test",
          failureDetails: [],
          invocations: 1,
          location: undefined,
        },
      ],
    });
    expect(suites).toEqual([
      {
        file: "test.ts",
        name: "test.ts",
        duration: 0,
        suites: [
          {
            file: "test.ts",
            name: "suite",
            duration: 0,
            suites: [],
            tests: [
              {
                name: "test",
                duration: 0,
                file: "test.ts",
                status: "skipped",
              },
            ],
          },
        ],
        tests: [],
      },
    ] satisfies TestSuite[]);
  });

  it("Should return a suite with a top level test", () => {
    const suites = parseRanSuite({
      ...emptyJestResults,
      testResults: [
        {
          ancestorTitles: [],
          duration: 0,
          failureMessages: [],
          fullName: "test",
          numPassingAsserts: 0,
          status: "skipped",
          title: "test",
          failureDetails: [],
          invocations: 1,
          location: undefined,
        },
      ],
    });
    expect(suites).toEqual([
      {
        file: "test.ts",
        name: "test.ts",
        duration: 0,
        suites: [],
        tests: [
          {
            name: "test",
            duration: 0,
            file: "test.ts",
            status: "skipped",
          },
        ],
      },
    ] satisfies TestSuite[]);
  });

  it("Should return a top level suite with multiple child suites and tests", () => {
    const suites = parseRanSuite({
      ...emptyJestResults,
      testResults: [
        {
          ancestorTitles: ["suite1", "suite2"],
          duration: 0,
          failureMessages: [],
          fullName: "suite1 suite2 test",
          numPassingAsserts: 0,
          status: "skipped",
          title: "test",
          failureDetails: [],
          invocations: 1,
          location: undefined,
        },
        {
          ancestorTitles: ["suite1"],
          duration: 0,
          failureMessages: ["failure message"],
          fullName: "suite1 test",
          numPassingAsserts: 0,
          status: "failed",
          title: "test",
          failureDetails: [],
          invocations: 1,
          location: undefined,
        },
      ],
    });
    expect(suites).toEqual([
      {
        file: "test.ts",
        name: "test.ts",
        duration: 0,
        suites: [
          {
            file: "test.ts",
            name: "suite1",
            duration: 0,
            suites: [
              {
                file: "test.ts",
                name: "suite2",
                duration: 0,
                suites: [],
                tests: [
                  {
                    name: "test",
                    duration: 0,
                    file: "test.ts",
                    status: "skipped",
                  },
                ],
              },
            ],
            tests: [
              {
                name: "test",
                duration: 0,
                file: "test.ts",
                status: "failed",
                error: "failure message",
              },
            ],
          },
        ],
        tests: [],
      },
    ] satisfies TestSuite[]);
  });
});
