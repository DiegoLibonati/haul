import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("when the key has a stored value", () => {
    it("should return the parsed object", () => {
      localStorage.setItem("test-key", JSON.stringify({ name: "Alice" }));
      const result = getLocalStorage("test-key");
      expect(result).toEqual({ name: "Alice" });
    });

    it("should return the parsed array", () => {
      const data = [{ id: "1", title: "Buy milk" }];
      localStorage.setItem("test-key", JSON.stringify(data));
      const result = getLocalStorage("test-key");
      expect(result).toEqual(data);
    });

    it("should return a parsed number", () => {
      localStorage.setItem("test-key", JSON.stringify(42));
      const result = getLocalStorage("test-key");
      expect(result).toBe(42);
    });
  });

  describe("when the key does not exist", () => {
    it("should return null", () => {
      const result = getLocalStorage("missing-key");
      expect(result).toBeNull();
    });
  });

  describe("when the key has an empty string value", () => {
    it("should return null", () => {
      localStorage.setItem("test-key", "");
      const result = getLocalStorage("test-key");
      expect(result).toBeNull();
    });
  });
});
