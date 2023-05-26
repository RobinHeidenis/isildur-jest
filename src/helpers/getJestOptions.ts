import { PartialTestRunnerOptions } from "@isildur-testing/api";
import { runCLI } from "jest";
import { WEIRD_JEST_DEFAULT_CONFIG } from "~/helpers/weirdJestDefaultConfig.js";

export const getJestOptions = (
  options?: PartialTestRunnerOptions
): Parameters<typeof runCLI>[0] => {
  return {
    ...WEIRD_JEST_DEFAULT_CONFIG,
    projects: [process.cwd()],
    ...(options?.config && { config: options.config }),
    ...(options?.bail && { bail: options.bail }),
    ...(options?.allowNoTests && { passWithNoTests: options.allowNoTests }),
    ...(options?.diff && { expand: options.diff }),
    ...(options?.maxWorkers && { maxWorkers: options.maxWorkers }),
    ...(options?.testNameFilter && { testNamePattern: options.testNameFilter }),
    ...(options?.timeout && { testTimeout: options.timeout }),
  } satisfies Parameters<typeof runCLI>[0];
};
