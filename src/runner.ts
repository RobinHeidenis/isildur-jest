import {
  BaseTestSuite,
  IsildurTestRunner,
  TestRunnerOptions,
  TestSuite,
} from "@isildur-testing/api";
import { methods } from "./methods/index.js";

export class JestRunner implements IsildurTestRunner {
  async run(options?: TestRunnerOptions): Promise<TestSuite[]> {
    return methods.runAllTests(options);
  }

  async discover(options?: TestRunnerOptions): Promise<BaseTestSuite[]> {
    return methods.discoverAllTests(options);
  }
}
