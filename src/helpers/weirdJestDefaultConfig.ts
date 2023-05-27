import { runCLI } from "jest";

export const WEIRD_JEST_DEFAULT_CONFIG = {
  _: [],
  $0: "",
} satisfies Partial<Parameters<typeof runCLI>[0]>; // Jest typings are very weird, these options are required for TypeScript to be satisfied
