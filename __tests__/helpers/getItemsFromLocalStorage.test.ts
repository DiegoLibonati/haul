import { getItemsFromLocalStorage } from "@/helpers/getItemsFromLocalStorage";

import { mockItems } from "@tests/__mocks__/items.mock";
import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

import { LOCAL_STORAGE_KEY_ITEMS } from "@/constants/vars";

describe("getItemsFromLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("should return items from localStorage", () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));

    const result = getItemsFromLocalStorage();

    expect(result).toEqual(mockItems);
  });

  it("should return empty array when no items in localStorage", () => {
    const result = getItemsFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, "null");

    const result = getItemsFromLocalStorage();

    expect(result).toEqual([]);
  });
});
