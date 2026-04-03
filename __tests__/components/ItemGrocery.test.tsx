import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ItemGroceryProps } from "@/types/props";

import ItemGrocery from "@/components/ItemGrocery/ItemGrocery";

type RenderComponent = {
  props: ItemGroceryProps;
};

const renderComponent = (overrides?: Partial<ItemGroceryProps>): RenderComponent => {
  const mockRemoveItem = jest.fn();
  const mockEditItem = jest.fn();

  const props: ItemGroceryProps = {
    id: "1",
    title: "Buy milk",
    removeItem: mockRemoveItem,
    editItem: mockEditItem,
    ...overrides,
  };

  render(<ItemGrocery {...props} />);

  return { props };
};

describe("ItemGrocery", () => {
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
    const mockEditItem = jest.fn();
    const user = userEvent.setup();

    renderComponent({ editItem: mockEditItem });

    await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));

    expect(mockEditItem).toHaveBeenCalledWith("1", "Buy milk");
    expect(mockEditItem).toHaveBeenCalledTimes(1);
  });

  it("should call removeItem with id when remove button is clicked", async () => {
    const removeItem = jest.fn();
    const user = userEvent.setup();

    renderComponent({ removeItem });

    await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));

    expect(removeItem).toHaveBeenCalledWith("1");
    expect(removeItem).toHaveBeenCalledTimes(1);
  });

  it("should not call editItem when not clicked", () => {
    const mockEditItem = jest.fn();
    renderComponent({ editItem: mockEditItem });
    expect(mockEditItem).not.toHaveBeenCalled();
  });

  it("should not call removeItem when not clicked", () => {
    const mockRemoveItem = jest.fn();
    renderComponent({ removeItem: mockRemoveItem });
    expect(mockRemoveItem).not.toHaveBeenCalled();
  });
});
