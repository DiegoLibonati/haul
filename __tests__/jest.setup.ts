import "@testing-library/jest-dom";

import { mockLocalStorage, storage } from "@tests/__mocks__/localStorage.mock";

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mockLocalStorage.getItem,
    setItem: mockLocalStorage.setItem,
    removeItem: mockLocalStorage.removeItem,
    clear: mockLocalStorage.clear,
    key: mockLocalStorage.key,
    length: mockLocalStorage.length,
  },
  writable: true,
});

beforeEach(() => {
  mockLocalStorage.getItem.mockImplementation(
    (key: string): string | null => storage.get(key) ?? null
  );
  mockLocalStorage.setItem.mockImplementation((key: string, value: string): void => {
    storage.set(key, value);
  });
  mockLocalStorage.removeItem.mockImplementation((key: string): void => {
    storage.delete(key);
  });
  mockLocalStorage.clear.mockImplementation((): void => {
    storage.clear();
  });
  mockLocalStorage.key.mockImplementation((index: number): string | null => {
    const keys = Array.from(storage.keys());
    return keys[index] ?? null;
  });
});
