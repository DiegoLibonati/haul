import type { Item } from "@/types/app";

import { getLocalStorage } from "@/helpers/getLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "@/constants/vars";

export const getItemsFromLocalStorage = (): Item[] => {
  const items = getLocalStorage(LOCAL_STORAGE_KEY_ITEMS) as Item[] | null;

  return items ?? [];
};
