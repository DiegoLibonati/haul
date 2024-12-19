import { Item } from "../entities/entities";

import { getLocalStorage } from "./getLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "../constants/config";

export const getItemsFromLocalStorage = (): Item[] => {
  const items = getLocalStorage<Item[]>(LOCAL_STORAGE_KEY_ITEMS);

  return items ? items : [];
};
