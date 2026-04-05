import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ItemGroceryProps } from "@/types/props";

import ItemGrocery from "@/components/ItemGrocery/ItemGrocery";

interface RenderComponent {
  container: HTMLElement;
  props: ItemGroceryProps;
}

const mockRemoveItem = jest.fn();
const mockEditItem = jest.fn();

const renderComponent = (overrides?: Partial<ItemGroceryProps>): RenderComponent => {
  const props: ItemGroceryProps = {
    id: "1",
    title: "Buy milk",
    removeItem: mockRemoveItem,
    editItem: mockEditItem,
    ...overrides,
  };

  const { container } = render(<ItemGrocery {...props} />);

  return { container, props };
};

describe("ItemGrocery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the item title", () => {
    renderComponent();
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("should render edit button with aria-label including the title", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Edit Buy milk" })).toBeInTheDocument();
  });

  it("should render remove button with aria-label including the title", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Remove Buy milk" })).toBeInTheDocument();
  });

  it("should call editItem with id and title when edit button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));

    expect(mockEditItem).toHaveBeenCalledWith("1", "Buy milk");
    expect(mockEditItem).toHaveBeenCalledTimes(1);
  });

  it("should call removeItem with id when remove button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));

    expect(mockRemoveItem).toHaveBeenCalledWith("1");
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
  });

  it("should not call editItem when not clicked", () => {
    renderComponent();
    expect(mockEditItem).not.toHaveBeenCalled();
  });

  it("should not call removeItem when not clicked", () => {
    renderComponent();
    expect(mockRemoveItem).not.toHaveBeenCalled();
  });
});
