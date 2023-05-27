import { BaseTestSuite, TestSuite } from "@isildur-testing/api";
import path from "node:path";
import { TestResults } from "~/helpers/parseSuite.js";

interface TestNode {
  name: string;
  status: string;
  file: string;
  duration: number;
}

interface SuiteNode {
  file: string;
  name: string;
  suites: SuiteNode[];
  tests: TestNode[];
}

export const getLabel = (testPath: string) => {
  const projectRoot = path.normalize(process.cwd());
  const suitePath = path.normalize(testPath);
  const suiteFile = suitePath.charAt(0).toLowerCase() + suitePath.slice(1);

  const label = suiteFile.startsWith(projectRoot)
    ? suiteFile.split(projectRoot)[1] ?? suiteFile
    : suiteFile;
  return label[0] === path.sep ? label.slice(path.sep.length) : label;
};

export const findOrCreateDiscoveredSuite = (
  parentNode: SuiteNode,
  suitePath: string[]
): SuiteNode => {
  if (suitePath.length === 0) {
    return parentNode;
  }

  const suiteName = suitePath.shift();
  let suite = parentNode.suites.find((s) => s.name === suiteName);

  if (!suite) {
    suite = {
      file: parentNode.file,
      name: suiteName ?? "unknown",
      suites: [],
      tests: [],
    };
    parentNode.suites.push(suite);
  }

  return findOrCreateDiscoveredSuite(suite, suitePath);
};

export const findOrCreateRanSuite = (
  parentNode: TestSuite,
  suitePath: string[]
): TestSuite => {
  if (suitePath.length === 0) {
    return parentNode;
  }

  const suiteName = suitePath.shift();
  let suite = parentNode.suites.find((s) => s.name === suiteName);

  if (!suite) {
    suite = {
      file: parentNode.file,
      name: suiteName ?? "unknown",
      duration: 0,
      suites: [],
      tests: [],
    };

    parentNode.suites.push(suite);
  }

  return findOrCreateRanSuite(suite, suitePath);
};

export const buildTree = (
  node: SuiteNode,
  test: TestResults["testResults"][number]
) => {
  const suitePath = test.ancestorTitles.slice();
  const suite = findOrCreateDiscoveredSuite(node, suitePath);
  const testNode: TestNode = {
    name: test.title,
    status: test.status,
    file: node.file,
    duration: -1,
  };
  suite.tests.push(testNode);
};

export const buildRanTree = (
  node: TestSuite,
  test: TestResults["testResults"][number]
) => {
  const suitePath = test.ancestorTitles.slice();
  const suite = findOrCreateRanSuite(node, suitePath);
  let testNode;

  if (test.status === "passed") {
    testNode = {
      file: node.file,
      name: test.title,
      status: "passed",
      duration: test.duration ?? 0,
    } as const;
  } else if (
    test.status === "pending" ||
    test.status === "todo" ||
    test.status === "disabled" ||
    test.status === "skipped"
  ) {
    testNode = {
      file: node.file,
      name: test.title,
      status: "skipped",
      duration: test.duration ?? 0,
    } as const;
  } else {
    testNode = {
      file: node.file,
      name: test.title,
      status: "failed",
      duration: test.duration ?? 0,
      error: test.failureMessages.join("\n"),
    } as const;
  }
  suite.tests.push(testNode);
};

export const transformDiscoveredSuiteFileMap = (
  fileMap: Map<string, { tests: TestResults["testResults"][number][] }>
): BaseTestSuite[] => {
  return Array.from(fileMap).map(([file, { tests }]) => {
    const base = {
      file,
      name: getLabel(file),
      suites: [],
      tests: [],
    };

    tests.forEach((test) => {
      buildTree(base, test);
    });

    return base;
  });
};

export const transformRanSuiteFileMap = (
  fileMap: Map<string, { tests: TestResults["testResults"][number][] }>
): TestSuite[] => {
  return Array.from(fileMap).map(([file, { tests }]) => {
    const base: TestSuite = {
      file,
      name: getLabel(file),
      duration: 0,
      suites: [],
      tests: [],
    };

    tests.forEach((test) => {
      buildRanTree(base, test);
    });

    updateSuiteStatistics(base);

    return base;
  });
};

export const updateSuiteStatistics = (suite: TestSuite) => {
  suite.suites.forEach((childSuite) => {
    updateSuiteStatistics(childSuite);
    suite.duration += childSuite.duration;
  });

  suite.tests.forEach((test) => {
    suite.duration += test.duration;
  });
};
