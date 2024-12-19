import "@testing-library/jest-dom";

// Mock Local Storage

export const LOCAL_STORAGE_MOCKS = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: LOCAL_STORAGE_MOCKS.getItem,
    setItem: LOCAL_STORAGE_MOCKS.setItem,
  },
});
