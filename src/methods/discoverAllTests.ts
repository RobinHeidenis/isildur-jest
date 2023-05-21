import { BaseTestSuite } from "@isildur-testing/api";
import jest from "jest";
import { parseDiscoveredSuite } from "~/helpers/parseSuite";
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

  return result.results.testResults.flatMap((suite) =>
    parseDiscoveredSuite(suite)
  );
};
