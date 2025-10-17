import { getItemsFromLocalStorage } from "@src/helpers/getItemsFromLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "@src/constants/vars";

import { mockLocalStorage } from "@tests/jest.constants";

describe("getItemsFromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of categories.", () => {
      getItemsFromLocalStorage();

      expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY_ITEMS
      );
    });
  });
});
