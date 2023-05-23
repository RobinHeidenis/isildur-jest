import { TestSuite } from "@isildur-testing/api";
import jest from "jest";
import { parseRanSuite } from "~/helpers/parseSuite";
const { runCLI } = jest;

export const runAllTests = async (): Promise<TestSuite[]> => {
  const options = {
    projects: [process.cwd()],
    silent: true,
    color: false,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const result = await runCLI(options, options.projects);

  return result.results.testResults.flatMap((suite) =>
    parseRanSuite(suite)
  );
};
