import { getLabel } from "~/helpers/transformSuite";

describe("getLabel", () => {
    it("should return the label for a file", () => {
      const label = getLabel("transformSuite.test.ts");
      expect(label).toBe("transformSuite.test.ts");
    });
  
    it("should return the label for a file in a subdirectory", () => {
      const label = getLabel("helpers/transformSuite.test.ts");
      expect(label).toBe("helpers\\transformSuite.test.ts");
    });
  
    it("should return the label for a file in a subdirectory with a different separator", () => {
      const label = getLabel("helpers\\transformSuite.test.ts");
      expect(label).toBe("helpers\\transformSuite.test.ts");
    });
  
    it("should return the label for a file in a subdirectory with a relative path", () => {
      const label = getLabel("helpers/../../transformSuite.test.ts");
      expect(label).toBe("..\\transformSuite.test.ts");
    });
  
    it("should return a period when no path has been given", () => {
      expect(getLabel("")).toBe(".");
    });
  
    it("should return a lowercase drive letter when a full path is passed", () => {
      expect(getLabel("C:\\Users\\user\\Desktop\\transformSuite.test.ts")).toBe(
        "c:\\Users\\user\\Desktop\\transformSuite.test.ts"
      );
    });
  });