import { runCLI } from "jest";
import path from 'node:path';

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

export const buildTestTree = (
  testResults: Awaited<
    ReturnType<typeof runCLI>
  >["results"]["testResults"][number]
) => {
  const tree = {
    file: testResults.testFilePath,
    name: getLabel(testResults.testFilePath),
    suites: [],
    tests: [],
  } satisfies SuiteNode;

  // Helper function to find or create a suite in the tree
  const findOrCreateSuite = (
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
        file: testResults.testFilePath,
        name: suiteName ?? "unknown",
        suites: [],
        tests: [],
      };
      parentNode.suites.push(suite);
    }

    return findOrCreateSuite(suite, suitePath);
  };

  // Recursive function to build the tree
  const buildTree = (
    node: SuiteNode,
    test: Awaited<
      ReturnType<typeof runCLI>
    >["results"]["testResults"][number]["testResults"][number]
  ) => {
    const suitePath = test.ancestorTitles.slice();
    const suite = findOrCreateSuite(node, suitePath);
    const testNode: TestNode = {
      name: test.title,
      status: test.status,
      file: testResults.testFilePath,
      duration: -1,
    };
    suite.tests.push(testNode);
  };

  testResults.testResults.forEach((test) => {
    buildTree(tree, test);
  });

  return tree;
};

function getLabel(testPath: string) {
  const projectRoot = path.normalize(
    process.cwd()
  );
  const suitePath = path.normalize(testPath);
  const suiteFile = suitePath.charAt(0).toLowerCase() + suitePath.slice(1);

  const label = suiteFile.startsWith(projectRoot)
    ? suiteFile.split(projectRoot)[1] ?? suiteFile
    : suiteFile;
  return label[0] === path.sep ? label.slice(path.sep.length) : label;
}