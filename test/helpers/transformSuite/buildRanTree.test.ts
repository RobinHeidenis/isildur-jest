import { buildRanTree } from "~/helpers/transformSuite";

describe("buildRanTree", () => {
  it("should build a tree from a list of ancestor titles with a passing test", () => {
    const suite = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [],
      tests: [],
    };

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers"],
      title: "should do something",
      fullName: "helpers testing helpers should do something",
      duration: 0,
      status: "passed",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: [],
    });

    console.log(suite);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0, //statistics get updated in another function
      numSkipped: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              numFailing: 0,
              numPassing: 0,
              numSkipped: 0,
              suites: [],
              tests: [
                {
                  name: "should do something",
                  duration: 0,
                  file: "transformSuite.test.ts",
                  status: "pass",
                },
              ],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    });
  });

  it("should build a tree from a list of ancestor titles with a failing test", () => {
    const suite = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [],
      tests: [],
    };

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers"],
      title: "should do something",
      fullName: "helpers testing helpers should do something",
      duration: 0,
      status: "failed",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: ["oopsie something went wrong :("],
    });

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              numFailing: 0,
              numPassing: 0,
              numSkipped: 0,
              suites: [],
              tests: [
                {
                  name: "should do something",
                  duration: 0,
                  file: "transformSuite.test.ts",
                  status: "fail",
                  error: "oopsie something went wrong :("
                },
              ],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    });
  });

  it("should build a tree from a list of ancestor titles with a skipped test", () => {
    const suite = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [],
      tests: [],
    };

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers"],
      title: "should do something",
      fullName: "helpers testing helpers should do something",
      duration: 0,
      status: "skipped",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: [],
    });

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              numFailing: 0,
              numPassing: 0,
              numSkipped: 0,
              suites: [],
              tests: [
                {
                  name: "should do something",
                  duration: 0,
                  file: "transformSuite.test.ts",
                  status: "skipped",
                },
              ],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    });
  });

  it("should build a tree from multiple tests with different ancestor titles and statuses", () => {
    const suite = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [],
      tests: [],
    };

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers"],
      title: "should do something",
      fullName: "helpers testing helpers should do something",
      duration: 0,
      status: "passed",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: [],
    });

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers"],
      title: "should do something else",
      fullName: "helpers testing helpers should do something else",
      duration: 0,
      status: "failed",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: ["oopsie something went wrong :("],
    });

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers"],
      title: "should do something else again",
      fullName: "helpers testing helpers should do something else again",
      duration: 0,
      status: "skipped",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: [],
    });

    buildRanTree(suite, {
      ancestorTitles: ["helpers", "testing helpers", "transformSuite"],
      title: "should do something",
      fullName: "helpers testing helpers transformSuite should do something",
      duration: 0,
      status: "passed",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: [],
    });

    buildRanTree(suite, {
      ancestorTitles: ["otherSuite"],
      title: "should do something else",
      fullName: "helpers testing helpers transformSuite should do something else",
      duration: 0,
      status: "failed",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: ["oopsie something went wrong :("],
    });

    buildRanTree(suite, {
      ancestorTitles: ["otherSuite"],
      title: "should do something else again",
      fullName: "helpers testing helpers transformSuite should do something else again",
      duration: 0,
      status: "skipped",
      failureDetails: [],
      numPassingAsserts: 1,
      failureMessages: [],
    });

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              numFailing: 0,
              numPassing: 0,
              numSkipped: 0,
              suites: [
                {
                  file: "transformSuite.test.ts",
                  name: "transformSuite",
                  duration: 0,
                  numFailing: 0,
                  numPassing: 0,
                  numSkipped: 0,
                  suites: [],
                  tests: [
                    {
                      name: "should do something",
                      duration: 0,
                      file: "transformSuite.test.ts",
                      status: "pass",
                    },
                  ],
                },
              ],
              tests: [
                {
                  name: "should do something",
                  duration: 0,
                  file: "transformSuite.test.ts",
                  status: "pass",
                },
                {
                  name: "should do something else",
                  duration: 0,
                  file: "transformSuite.test.ts",
                  status: "fail",
                  error: "oopsie something went wrong :(",
                },
                {
                  name: "should do something else again",
                  duration: 0,
                  file: "transformSuite.test.ts",
                  status: "skipped",
                },
              ],
            },
          ],
          tests: [],
        },
        {
          file: "transformSuite.test.ts",
          name: "otherSuite",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              name: "should do something else",
              duration: 0,
              file: "transformSuite.test.ts",
              status: "fail",
              error: "oopsie something went wrong :(",
            },
            {
              name: "should do something else again",
              duration: 0,
              file: "transformSuite.test.ts",
              status: "skipped",
            },
          ],
        },
      ],
      tests: [],
    });
  });
});
