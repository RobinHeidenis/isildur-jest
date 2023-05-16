import { BaseTestSuite } from "@isildur-testing/api";
import jest from "jest";
import { buildTestTree } from "~/helpers/transformSuite";
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

  return result.results.testResults.map(buildTestTree);
};
