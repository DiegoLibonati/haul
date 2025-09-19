import { Item } from "@src/entities/entities";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "@src/constants/config";

export const getItemsFromLocalStorage = (): Item[] => {
  const items = getLocalStorage<Item[]>(LOCAL_STORAGE_KEY_ITEMS);

  return items ? items : [];
};
