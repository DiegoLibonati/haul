import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GroceryBudPage from "@/pages/GroceryBudPage/GroceryBudPage";

import { LOCAL_STORAGE_KEY_ITEMS } from "@/constants/vars";

import { mockItems } from "@tests/__mocks__/items.mock";
import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

type RenderPage = { container: HTMLElement };

const renderPage = (): RenderPage => {
  const { container } = render(<GroceryBudPage />);
  return { container };
};

describe("GroceryBudPage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page title", () => {
    renderPage();
    expect(screen.getByText("Grocery Bud")).toBeInTheDocument();
  });

  it("should render the grocery item name input", () => {
    renderPage();
    expect(screen.getByRole("textbox", { name: "Grocery item name" })).toBeInTheDocument();
  });

  it("should render the add item button by default", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });

  it("should display items loaded from localStorage on mount", () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    renderPage();
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("should not show clear items button when there are no items", () => {
    renderPage();
    expect(screen.queryByRole("button", { name: "Clear all items" })).not.toBeInTheDocument();
  });

  it("should show clear items button when there are items", () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    renderPage();
    expect(screen.getByRole("button", { name: "Clear all items" })).toBeInTheDocument();
  });

  it("should add a new item after submitting a valid name", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByRole("textbox", { name: "Grocery item name" }), "Buy eggs");
    await user.click(screen.getByRole("button", { name: "Add item" }));

    expect(await screen.findByText("Buy eggs")).toBeInTheDocument();
  });

  it("should clear the input after successfully adding an item", async () => {
    const user = userEvent.setup();
    renderPage();

    const input = screen.getByRole("textbox", { name: "Grocery item name" });
    await user.type(input, "Buy eggs");
    await user.click(screen.getByRole("button", { name: "Add item" }));

    expect(await screen.findByDisplayValue("")).toBeInTheDocument();
  });

  it("should show success alert after adding an item", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByRole("textbox", { name: "Grocery item name" }), "Buy eggs");
    await user.click(screen.getByRole("button", { name: "Add item" }));

    expect(await screen.findByText("Added successfully")).toBeInTheDocument();
  });

  it("should show error alert when submitting an empty name", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Add item" }));

    expect(await screen.findByText("Invalid entry")).toBeInTheDocument();
  });

  it("should load item into the form and switch to edit mode", async () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));

    expect(screen.getByRole("textbox", { name: "Grocery item name" })).toHaveValue("Buy milk");
    expect(await screen.findByRole("button", { name: "Edit item" })).toBeInTheDocument();
  });

  it("should update the item title after editing and submitting", async () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));

    const input = screen.getByRole("textbox", { name: "Grocery item name" });
    await user.clear(input);
    await user.type(input, "Buy almond milk");
    await user.click(screen.getByRole("button", { name: "Edit item" }));

    expect(await screen.findByText("Buy almond milk")).toBeInTheDocument();
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });

  it("should show success alert after editing an item", async () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));

    const input = screen.getByRole("textbox", { name: "Grocery item name" });
    await user.clear(input);
    await user.type(input, "Buy almond milk");
    await user.click(screen.getByRole("button", { name: "Edit item" }));

    expect(await screen.findByText("Edit successfully")).toBeInTheDocument();
  });

  it("should remove an item when the remove button is clicked", async () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));

    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });

  it("should clear all items when clear items button is clicked", async () => {
    mockLocalStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(mockItems));
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Clear all items" }));

    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Clear all items" })).not.toBeInTheDocument();
  });
});
