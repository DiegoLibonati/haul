import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("when storing an object", () => {
    it("should store the value as a JSON string", () => {
      const data = { name: "Alice" };
      setLocalStorage("test-key", data);
      expect(localStorage.getItem("test-key")).toBe(JSON.stringify(data));
    });
  });

  describe("when storing an array", () => {
    it("should store the array as a JSON string", () => {
      const data = [{ id: "1", title: "Buy milk" }];
      setLocalStorage("test-key", data);
      expect(localStorage.getItem("test-key")).toBe(JSON.stringify(data));
    });

    it("should store an empty array as a JSON string", () => {
      setLocalStorage("test-key", []);
      expect(localStorage.getItem("test-key")).toBe("[]");
    });
  });

  describe("when storing a primitive value", () => {
    it("should store a string as a JSON string", () => {
      setLocalStorage("test-key", "hello");
      expect(localStorage.getItem("test-key")).toBe('"hello"');
    });

    it("should store a number as a JSON string", () => {
      setLocalStorage("test-key", 42);
      expect(localStorage.getItem("test-key")).toBe("42");
    });
  });

  describe("when overwriting an existing key", () => {
    it("should replace the previous value", () => {
      setLocalStorage("test-key", { old: true });
      setLocalStorage("test-key", { new: true });
      expect(localStorage.getItem("test-key")).toBe(JSON.stringify({ new: true }));
    });
  });
});
