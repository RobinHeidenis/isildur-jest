import { IsildurTestRunner, TestSuite } from "@isildur-testing/api";
import { methods } from "./methods";

export class JestRunner implements IsildurTestRunner {
  async runAllTests(): Promise<TestSuite[]> {
    return methods.runAllTests();
  }
}