import { findOrCreateDiscoveredSuite } from "~/helpers/transformSuite";

describe("findOrCreateDiscoveredSuite", () => {
  it("should return the parent node when no suite path is given", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [],
      tests: [],
    };

    const suite = findOrCreateDiscoveredSuite(parentNode, []);

    expect(suite).toBe(parentNode);
  });

  it("should create a new node when the requested path is not on the parent node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [],
      tests: [],
    };

    const suite = findOrCreateDiscoveredSuite(parentNode, ["helpers"]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "helpers",
      suites: [],
      tests: [],
    });
  });

  it("should return the existing node when the requested path is on the parent node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          suites: [],
          tests: [],
        },
      ],
      tests: [],
    };

    const suite = findOrCreateDiscoveredSuite(parentNode, ["helpers"]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "helpers",
      suites: [],
      tests: [],
    });
  });

  it("should return the existing node when the requested path is on a deeper suite", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              suites: [],
              tests: [],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    };

    const suite = findOrCreateDiscoveredSuite(parentNode, [
      "helpers",
      "testing helpers",
    ]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "testing helpers",
      suites: [],
      tests: [],
    });
  });

  it("should create a new node when the requested path is not on a deeper suite", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              suites: [],
              tests: [],
            },
          ],
          tests: [],
        },
      ],
      tests: [],
    };

    const suite = findOrCreateDiscoveredSuite(parentNode, [
      "helpers",
      "testing helpers",
      "new suite",
    ]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "new suite",
      suites: [],
      tests: [],
    });

    expect(parentNode).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              suites: [
                {
                  file: "transformSuite.test.ts",
                  name: "new suite",
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
    });
  });

  it("should create a bunch of new nodes when the requested deep path is not on the parent node", () => {
    const parentNode = {
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [],
      tests: [],
    };

    const suite = findOrCreateDiscoveredSuite(parentNode, [
      "helpers",
      "testing helpers",
      "new suite",
    ]);

    expect(suite).toEqual({
      file: "transformSuite.test.ts",
      name: "new suite",
      suites: [],
      tests: [],
    });

    expect(parentNode).toEqual({
      file: "transformSuite.test.ts",
      name: "transformSuite.test.ts",
      suites: [
        {
          file: "transformSuite.test.ts",
          name: "helpers",
          suites: [
            {
              file: "transformSuite.test.ts",
              name: "testing helpers",
              suites: [
                {
                  file: "transformSuite.test.ts",
                  name: "new suite",
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
    });
  });
});
