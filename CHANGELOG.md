# @isildur-testing/jest

## 0.4.1

### Patch Changes

- 2f7bc2d: Small changes in code quality, added tests

## 0.4.0

### Minor Changes

- bfe9fe0: Implemented setting a config file location, setting a standard set of options, and setting custom Jest options

### Patch Changes

- c5b1cdf: Removed numPassing, numFailing, and numSkipped statistics from suites. Removed duration for discovered tests as it is not used

## 0.3.0

### Minor Changes

- 9fd3d83: Fixed parsing and transforming test results. This was going wrong before, but will now produce a uniform result no matter if you're running or disovering tests

### Patch Changes

- 6f379e5: Bump @isildur-testing/api to version 0.2.1

## 0.2.0

### Minor Changes

- a427d8b: Implemented discovering all tests in a project using Jest

### Patch Changes

- d431a12: Reduced time to discover all tests in a big project (231 tests) by ~90%

## 0.1.2

### Patch Changes

- 02b25b2: Fixed showConfig option that exits the jest process immediately and doesn't run any tests

## 0.1.1

### Patch Changes

- 2308e9c: Merged totalTodo and totalSkipped statistics together to adhere to API schema
- 2c11fea: Bumped @isildur-testing/api to version 0.1.0

## 0.1.0

### Minor Changes

- a5605fe: added running all tests with jest in the project directory the API is called from
