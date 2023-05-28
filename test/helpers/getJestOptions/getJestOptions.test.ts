import { getJestOptions } from "~/helpers/getJestOptions";

const defaultJestOptions = {
  projects: [process.cwd()],
  _: [],
  $0: "",
};

describe("getJestOptions", () => {
  it("Should return the default options when no options are given", () => {
    const options = getJestOptions();
    expect(options).toEqual(defaultJestOptions);
  });

  it("Should return the default options plus config location", () => {
    const options = getJestOptions({ config: "jest.config.js" });
    expect(options).toEqual({
      ...defaultJestOptions,
      config: "jest.config.js",
    });
  });

  it("Should return the default options plus bail", () => {
    const optionsWithBailEnabled = getJestOptions({ bail: true });
    expect(optionsWithBailEnabled).toEqual({
      ...defaultJestOptions,
      bail: true,
    });

    const optionsWithBailDisabled = getJestOptions({ bail: false });
    expect(optionsWithBailDisabled).toEqual({
      ...defaultJestOptions,
      bail: false,
    });
  });

  it("Should return the default options plus allowNoTests", () => {
    const optionsWithAllowNoTestsEnabled = getJestOptions({
      allowNoTests: true,
    });
    expect(optionsWithAllowNoTestsEnabled).toEqual({
      ...defaultJestOptions,
      passWithNoTests: true,
    });

    const optionsWithAllowNoTestsDisabled = getJestOptions({
      allowNoTests: false,
    });
    expect(optionsWithAllowNoTestsDisabled).toEqual({
      ...defaultJestOptions,
      passWithNoTests: false,
    });
  });

  it("Should return the default options plus diff", () => {
    const optionsWithDiffEnabled = getJestOptions({ diff: true });
    expect(optionsWithDiffEnabled).toEqual({
      ...defaultJestOptions,
      expand: true,
    });

    const optionsWithDiffDisabled = getJestOptions({ diff: false });
    expect(optionsWithDiffDisabled).toEqual({
      ...defaultJestOptions,
      expand: false,
    });
  });

  it("Should return the default options plus maxWorkers", () => {
    const optionsWithMaxWorkers = getJestOptions({ maxWorkers: 4 });
    expect(optionsWithMaxWorkers).toEqual({
      ...defaultJestOptions,
      maxWorkers: 4,
    });

    const optionsWithoutMaxWorkers = getJestOptions({ maxWorkers: undefined });
    expect(optionsWithoutMaxWorkers).toEqual(defaultJestOptions);

    const optionsWithMaxWorkersZero = getJestOptions({ maxWorkers: 0 });
    expect(optionsWithMaxWorkersZero).toEqual({
      ...defaultJestOptions,
      maxWorkers: 0,
    });
  });

  it("Should return the default options plus testNameFilter", () => {
    const optionsWithTestNameFilter = getJestOptions({
      testNameFilter: "test",
    });
    expect(optionsWithTestNameFilter).toEqual({
      ...defaultJestOptions,
      testNamePattern: "test",
    });

    const optionsWithoutTestNameFilter = getJestOptions({
      testNameFilter: undefined,
    });
    expect(optionsWithoutTestNameFilter).toEqual(defaultJestOptions,);

    const optionsWithTestNameFilterEmpty = getJestOptions({
      testNameFilter: "",
    });
    expect(optionsWithTestNameFilterEmpty).toEqual({
      ...defaultJestOptions,
      testNamePattern: "",
    });
  });

  it("Should return the default options plus timeout", () => {
    const optionsWithTimeout = getJestOptions({ timeout: 1000 });
    expect(optionsWithTimeout).toEqual({
      ...defaultJestOptions,
      testTimeout: 1000,
    });
  });

  it("Should return the default options plus runnerOptions", () => {
    const optionsWithRunnerOptions = getJestOptions({
      runnerOptions: { foo: "bar" },
    });
    expect(optionsWithRunnerOptions).toEqual({
      ...defaultJestOptions,
      foo: "bar",
    });
  });
});
