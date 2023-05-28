import { PartialTestRunnerOptions } from "@isildur-testing/api";
import { runCLI } from "jest";
import { WEIRD_JEST_DEFAULT_CONFIG } from "~/helpers/weirdJestDefaultConfig";

function has<K extends keyof PartialTestRunnerOptions>(
  obj: PartialTestRunnerOptions | undefined,
  prop: K
): obj is PartialTestRunnerOptions & Record<K, unknown> {
  return obj !== undefined && prop in obj;
}

export const getJestOptions = (
  options?: PartialTestRunnerOptions
): Parameters<typeof runCLI>[0] => {
  return {
    ...WEIRD_JEST_DEFAULT_CONFIG,
    projects: [process.cwd()],
    ...(has(options, "config") && { config: options.config }),
    ...(has(options, "bail") && { bail: options.bail }),
    ...(has(options, "allowNoTests") && {
      passWithNoTests: options.allowNoTests,
    }),
    ...(has(options, "diff") && { expand: options.diff }),
    ...(has(options, "maxWorkers") && { maxWorkers: options.maxWorkers }),
    ...(has(options, "testNameFilter") && {
      testNamePattern: options.testNameFilter,
    }),
    ...(has(options, "timeout") && { testTimeout: options.timeout }),
    ...options?.runnerOptions,
  } satisfies Parameters<typeof runCLI>[0];
};
