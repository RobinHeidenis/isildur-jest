import { TestSuite } from "@isildur-testing/api";
import { updateSuiteStatistics } from "~/helpers/transformSuite";

describe("updateSuiteStatistics", () => {
  it("should update duration statistics", () => {
    const suite = {
      file: "file",
      name: "name",
      duration: 0,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 300,
              status: "failed",
              error: "oopsie, something went wrong :(",
            } as const,
            {
              file: "file",
              name: "name",
              duration: 100,
              status: "failed",
              error: "oopsie, something went wrong :(",
            } as const,
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 0,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 200,
              status: "failed",
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
          status: "failed",
          error: "oopsie, something went wrong :(",
        } as const,
        {
          file: "file",
          name: "name",
          duration: 200,
          status: "failed",
          error: "oopsie, something went wrong :(",
        } as const,
      ],
    } satisfies TestSuite;

    updateSuiteStatistics(suite);

    expect(suite).toEqual({
      file: "file",
      name: "name",
      duration: 900,
      suites: [
        {
          file: "file",
          name: "name",
          duration: 400,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 300,
              status: "failed",
              error: "oopsie, something went wrong :(",
            },
            {
              file: "file",
              name: "name",
              duration: 100,
              status: "failed",
              error: "oopsie, something went wrong :(",
            },
          ],
        },
        {
          file: "file",
          name: "name",
          duration: 200,
          suites: [],
          tests: [
            {
              file: "file",
              name: "name",
              duration: 200,
              status: "failed",
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
          status: "failed",
          error: "oopsie, something went wrong :(",
        },
        {
          file: "file",
          name: "name",
          duration: 200,
          status: "failed",
          error: "oopsie, something went wrong :(",
        },
      ],
    } satisfies TestSuite);
  });
});
