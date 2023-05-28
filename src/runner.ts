import {
  BaseTestSuite,
  IsildurTestRunner,
  PartialTestRunnerOptions,
  TestSuite
} from "@isildur-testing/api";
import { methods } from "./methods/index";

export class JestRunner implements IsildurTestRunner {
  async run(options?: PartialTestRunnerOptions): Promise<TestSuite[]> {
    return methods.runAllTests(options);
  }

  async discover(options?: PartialTestRunnerOptions): Promise<BaseTestSuite[]> {
    return methods.discoverAllTests(options);
  }
}
