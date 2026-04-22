import type { Item } from "@/types/app";

import { getItemsFromLocalStorage } from "@/helpers/getItemsFromLocalStorage";

describe("getItemsFromLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("when localStorage has valid items", () => {
    it("should return the parsed items array", () => {
      const mockData: Item[] = [{ id: "1", title: "Buy milk" }];
      localStorage.setItem("items", JSON.stringify(mockData));
      const result = getItemsFromLocalStorage();
      expect(result).toEqual(mockData);
    });

    it("should return all items when multiple exist", () => {
      const mockData: Item[] = [
        { id: "1", title: "Buy milk" },
        { id: "2", title: "Buy eggs" },
      ];
      localStorage.setItem("items", JSON.stringify(mockData));
      const result = getItemsFromLocalStorage();
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockData);
    });
  });

  describe("when localStorage is empty", () => {
    it("should return an empty array", () => {
      const result = getItemsFromLocalStorage();
      expect(result).toEqual([]);
    });
  });

  describe("when the key has an empty string value", () => {
    it("should return an empty array", () => {
      localStorage.setItem("items", "");
      const result = getItemsFromLocalStorage();
      expect(result).toEqual([]);
    });
  });
});
