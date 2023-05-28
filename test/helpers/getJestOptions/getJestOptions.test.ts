import { getJestOptions } from "~/helpers/getJestOptions";

describe("getJestOptions", () => {
  it("Should return the default options when no options are given", () => {
    const options = getJestOptions();
    expect(options).toEqual({
      projects: [process.cwd()],
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus config location", () => {
    const options = getJestOptions({ config: "jest.config.js" });
    expect(options).toEqual({
      projects: [process.cwd()],
      config: "jest.config.js",
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus bail", () => {
    const optionsWithBailEnabled = getJestOptions({ bail: true });
    expect(optionsWithBailEnabled).toEqual({
      projects: [process.cwd()],
      bail: true,
      _: [],
      $0: "",
    });

    const optionsWithBailDisabled = getJestOptions({ bail: false });
    expect(optionsWithBailDisabled).toEqual({
      projects: [process.cwd()],
      bail: false,
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus allowNoTests", () => {
    const optionsWithAllowNoTestsEnabled = getJestOptions({
      allowNoTests: true,
    });
    expect(optionsWithAllowNoTestsEnabled).toEqual({
      projects: [process.cwd()],
      passWithNoTests: true,
      _: [],
      $0: "",
    });

    const optionsWithAllowNoTestsDisabled = getJestOptions({
      allowNoTests: false,
    });
    expect(optionsWithAllowNoTestsDisabled).toEqual({
      projects: [process.cwd()],
      passWithNoTests: false,
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus diff", () => {
    const optionsWithDiffEnabled = getJestOptions({ diff: true });
    expect(optionsWithDiffEnabled).toEqual({
      projects: [process.cwd()],
      expand: true,
      _: [],
      $0: "",
    });

    const optionsWithDiffDisabled = getJestOptions({ diff: false });
    expect(optionsWithDiffDisabled).toEqual({
      projects: [process.cwd()],
      expand: false,
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus maxWorkers", () => {
    const optionsWithMaxWorkers = getJestOptions({ maxWorkers: 4 });
    expect(optionsWithMaxWorkers).toEqual({
      projects: [process.cwd()],
      maxWorkers: 4,
      _: [],
      $0: "",
    });

    const optionsWithoutMaxWorkers = getJestOptions({ maxWorkers: undefined });
    expect(optionsWithoutMaxWorkers).toEqual({
      projects: [process.cwd()],
      _: [],
      $0: "",
    });

    const optionsWithMaxWorkersZero = getJestOptions({ maxWorkers: 0 });
    expect(optionsWithMaxWorkersZero).toEqual({
      projects: [process.cwd()],
      maxWorkers: 0,
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus testNameFilter", () => {
    const optionsWithTestNameFilter = getJestOptions({
      testNameFilter: "test",
    });
    expect(optionsWithTestNameFilter).toEqual({
      projects: [process.cwd()],
      testNamePattern: "test",
      _: [],
      $0: "",
    });

    const optionsWithoutTestNameFilter = getJestOptions({
      testNameFilter: undefined,
    });
    expect(optionsWithoutTestNameFilter).toEqual({
      projects: [process.cwd()],
      _: [],
      $0: "",
    });

    const optionsWithTestNameFilterEmpty = getJestOptions({
      testNameFilter: "",
    });
    expect(optionsWithTestNameFilterEmpty).toEqual({
      projects: [process.cwd()],
      testNamePattern: "",
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus timeout", () => {
    const optionsWithTimeout = getJestOptions({ timeout: 1000 });
    expect(optionsWithTimeout).toEqual({
      projects: [process.cwd()],
      testTimeout: 1000,
      _: [],
      $0: "",
    });
  });

  it("Should return the default options plus runnerOptions", () => {
    const optionsWithRunnerOptions = getJestOptions({
      runnerOptions: { foo: "bar" },
    });
    expect(optionsWithRunnerOptions).toEqual({
      projects: [process.cwd()],
      _: [],
      $0: "",
      foo: "bar",
    });
  });
});
