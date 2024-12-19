import { getItemsFromLocalStorage } from "./getItemsFromLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "../constants/config";

import { LOCAL_STORAGE_MOCKS } from "../tests/jest.setup";

test("The getItem of localStorage must be called with key of categories.", () => {
  getItemsFromLocalStorage();

  expect(LOCAL_STORAGE_MOCKS.getItem).toHaveBeenCalledTimes(1);
  expect(LOCAL_STORAGE_MOCKS.getItem).toHaveBeenCalledWith(
    LOCAL_STORAGE_KEY_ITEMS
  );
});
