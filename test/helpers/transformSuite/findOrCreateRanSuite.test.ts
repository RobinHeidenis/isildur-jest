import { TestSuite } from "@isildur-testing/api";
import { findOrCreateRanSuite } from "~/helpers/transformSuite";

describe("findOrCreateRanSuite", () => {
  it("should return the parent node when no suite path is given", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite;

    const suite = findOrCreateRanSuite(parentNode, []);

    expect(suite).toBe(parentNode);
  });

  it("should create a new node when the requested path is not on the parent node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite;

    const suite = findOrCreateRanSuite(parentNode, ["helpers"]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "helpers",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite);

    expect(parentNode).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite);
  });

  it("should return the existing node when the requested path is on the parent node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite;

    const suite = findOrCreateRanSuite(parentNode, ["helpers"]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "helpers",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite);

    expect(parentNode).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite);
  });

  it("should return the existing node when the requested path is on a deeper node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              suites: [],
              tests: [],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite;

    const suite = findOrCreateRanSuite(parentNode, [
      "helpers",
      "testing helpers",
    ]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "testing helpers",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite);
  });

  it("should create a new node when the requested path is not on a deeper node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              suites: [],
              tests: [],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite;

    const suite = findOrCreateRanSuite(parentNode, ["helpers", "new suite"]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "new suite",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite);

    expect(parentNode).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              duration: 0,
              suites: [],
              tests: [],
            },
            {
              file: "transformSuite.test.ts",
              name: "new suite",
              duration: 0,
              suites: [],
              tests: [],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite);
  });

  it("should create a bunch of new nodes when the requested deep path is not on the parent node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite;

    const suite = findOrCreateRanSuite(parentNode, [
      "helpers",
      "new suite",
      "newer suite",
    ]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "newer suite",
      duration: 0,
      suites: [],
      tests: [],
    } satisfies TestSuite);

    expect(parentNode).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      duration: 0,
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          duration: 0,
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "new suite",
              duration: 0,
              suites: [
                {
                  file: "transformSuite.test.ts",
                  name: "newer suite",
                  duration: 0,
                  suites: [],
                  tests: [],
                },
              ],
              tests: [],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    } satisfies TestSuite);
  });
});
