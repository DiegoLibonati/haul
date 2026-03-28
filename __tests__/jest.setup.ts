import "@testing-library/jest-dom";

import { mocksLocalStorage, storage } from "@tests/__mocks__/localStorage.mock";

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mocksLocalStorage.getItem,
    setItem: mocksLocalStorage.setItem,
    removeItem: mocksLocalStorage.removeItem,
    clear: mocksLocalStorage.clear,
    key: mocksLocalStorage.key,
    length: mocksLocalStorage.length,
  },
  writable: true,
});

beforeEach(() => {
  mocksLocalStorage.getItem.mockImplementation(
    (key: string): string | null => storage.get(key) ?? null
  );
  mocksLocalStorage.setItem.mockImplementation((key: string, value: string): void => {
    storage.set(key, value);
  });
  mocksLocalStorage.removeItem.mockImplementation((key: string): void => {
    storage.delete(key);
  });
  mocksLocalStorage.clear.mockImplementation((): void => {
    storage.clear();
  });
  mocksLocalStorage.key.mockImplementation((index: number): string | null => {
    const keys = Array.from(storage.keys());
    return keys[index] ?? null;
  });
});
