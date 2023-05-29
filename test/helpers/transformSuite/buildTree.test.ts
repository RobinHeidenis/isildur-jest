import { BaseTestSuite } from "@isildur-testing/api";
import { buildTree } from "~/helpers/transformSuite";

describe("buildTree", () => {
    it("should build a tree from a list of suites", () => {
      const suite = {
        file: "transformSuite.test.ts",
        name: "transformSuite.test.ts",
        suites: [],
        tests: [],
      } satisfies BaseTestSuite;
  
      buildTree(suite, {
        ancestorTitles: ["helpers", "testing helpers"],
        title: "should do something",
        fullName: "helpers testing helpers should do something",
        duration: 0,
        status: "passed",
        failureDetails: [],
        numPassingAsserts: 1,
        failureMessages: [],
      });
  
      expect(suite).toEqual({
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
                tests: [
                  {
                    name: "should do something",
                    duration: -1,
                    file: "transformSuite.test.ts",
                  },
                ],
              },
            ],
            tests: [],
          },
        ],
        tests: [],
      } satisfies BaseTestSuite);
    });
  });