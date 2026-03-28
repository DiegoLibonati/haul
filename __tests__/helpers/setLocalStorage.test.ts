import { setLocalStorage } from "@/helpers/setLocalStorage";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("setLocalStorage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
  });

  it("should store data in localStorage as JSON", () => {
    const testData = { title: "test", value: 123 };

    setLocalStorage("test-key", testData);

    expect(mocksLocalStorage.getItem("test-key")).toBe(JSON.stringify(testData));
  });

  it("should store arrays in localStorage", () => {
    const testArray = [1, 2, 3, 4, 5];

    setLocalStorage("test-array", testArray);

    expect(mocksLocalStorage.getItem("test-array")).toBe(JSON.stringify(testArray));
  });

  it("should store strings in localStorage", () => {
    const testString = "hello world";

    setLocalStorage("test-string", testString);

    expect(mocksLocalStorage.getItem("test-string")).toBe(JSON.stringify(testString));
  });

  it("should store boolean values in localStorage", () => {
    setLocalStorage("test-bool", true);

    expect(mocksLocalStorage.getItem("test-bool")).toBe(JSON.stringify(true));
  });

  it("should store number values in localStorage", () => {
    setLocalStorage("test-number", 42);

    expect(mocksLocalStorage.getItem("test-number")).toBe(JSON.stringify(42));
  });

  it("should overwrite existing data", () => {
    setLocalStorage("test-key", "first");
    setLocalStorage("test-key", "second");

    expect(mocksLocalStorage.getItem("test-key")).toBe(JSON.stringify("second"));
  });

  it("should store null values", () => {
    setLocalStorage("test-null", null);

    expect(mocksLocalStorage.getItem("test-null")).toBe(JSON.stringify(null));
  });
});
