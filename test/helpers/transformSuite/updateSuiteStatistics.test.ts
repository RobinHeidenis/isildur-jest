import { updateSuiteStatistics } from "~/helpers/transformSuite";

describe("updateSuiteStatistics", () => {
  it("should update passed tests statistics", () => {
    const suite = {
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "pass",
            } as const,
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "pass",
            } as const,
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "pass",
            } as const,
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "pass",
        } as const,
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "pass",
        } as const,
      ],
    };

    updateSuiteStatistics(suite);

    expect(suite).toEqual({
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 5,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 2,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "pass",
            },
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "pass",
            },
          ],
        },
        {
          file: "file",

          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 1,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "pass",
            },
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "pass",
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "pass",
        },
      ],
    });
  });

  it("should update failed tests statistics", () => {
    const suite = {
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numSkipped: 0,
          numPassing: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "fail",
          error: "oopsie, something went wrong :(",
        } as const,
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "fail",
          error: "oopsie, something went wrong :(",
        } as const,
      ],
    };

    updateSuiteStatistics(suite);

    expect(suite).toEqual({
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 5,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 2,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 1,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "fail",
          error: "oopsie, something went wrong :(",
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "fail",
          error: "oopsie, something went wrong :(",
        },
      ],
    });
  });

  it("should update skipped tests statistics", () => {
    const suite = {
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "skipped",
            } as const,
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "skipped",
            } as const,
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numSkipped: 0,
          numPassing: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "skipped",
            } as const,
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "skipped",
        } as const,
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "skipped",
        } as const,
      ],
    };

    updateSuiteStatistics(suite);

    expect(suite).toEqual({
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 5,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 2,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "skipped",
            },
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "skipped",
            },
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 1,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 0,
              status: "skipped",
            },
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "skipped",
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          status: "skipped",
        },
      ],
    });
  });

  it("should update duration statistics", () => {
    const suite = {
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 300,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
            {
              file: "file",
              name: "name",
              duration: 100,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numSkipped: 0,
          numPassing: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 200,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 100,
          status: "fail",
          error: "oopsie, something went wrong :(",
        } as const,
        {
          file: "file",
          name: "name",
          duration: 200,
          status: "fail",
          error: "oopsie, something went wrong :(",
        } as const,
      ],
    };

    updateSuiteStatistics(suite);

    expect(suite).toEqual({
      file: "file",
      name: "name",
      duration: 900,
      numFailing: 5,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 400,
          numFailing: 2,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 300,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
            {
              file: "file",
              name: "name",
              duration: 100,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 200,
          numFailing: 1,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 200,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 100,
          status: "fail",
          error: "oopsie, something went wrong :(",
        },
        {
          file: "file",
          name: "name",
          duration: 200,
          status: "fail",
          error: "oopsie, something went wrong :(",
        },
      ],
    });
  });

  it("should update all statistics with mixed statuses and durations", () => {
    const suite = {
      file: "file",
      name: "name",
      duration: 0,
      numFailing: 0,
      numPassing: 0,
      numSkipped: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 300,
              status: "fail",
              error: "oopsie, something went wrong :(",
            } as const,
            {
              file: "file",
              name: "name",
              duration: 100,
              status: "pass",
            } as const,
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          numFailing: 0,
          numSkipped: 0,
          numPassing: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 200,
              status: "skipped",
            } as const,
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 100,
          status: "pass",
        } as const,
        {
          file: "file",
          name: "name",
          duration: 200,
          status: "skipped",
        } as const,
      ],
    };

    updateSuiteStatistics(suite);

    expect(suite).toEqual({
      file: "file",
      name: "name",
      duration: 900,
      numFailing: 1,
      numPassing: 2,
      numSkipped: 2,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 400,
          numFailing: 1,
          numPassing: 1,
          numSkipped: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 300,
              status: "fail",
              error: "oopsie, something went wrong :(",
            },
            {
              file: "file",
              name: "name",
              duration: 100,
              status: "pass",
            },
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 200,
          numFailing: 0,
          numPassing: 0,
          numSkipped: 1,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 200,
              status: "skipped",
            },
          ],
        },
      ],
      tests: [
        {
          file: "file",
          name: "name",
          duration: 100,
          status: "pass",
        },
        {
          file: "file",
          name: "name",
          duration: 200,
          status: "skipped",
        },
      ],
    });
  });
});
