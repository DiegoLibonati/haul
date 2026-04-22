import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ItemGroceryProps } from "@/types/props";

import ItemGrocery from "@/components/ItemGrocery/ItemGrocery";

const mockRemoveItem = jest.fn();
const mockEditItem = jest.fn();

const renderComponent = (props: Partial<ItemGroceryProps> = {}): RenderResult => {
  const defaultProps: ItemGroceryProps = {
    id: "1",
    title: "Buy milk",
    removeItem: mockRemoveItem,
    editItem: mockEditItem,
    ...props,
  };
  return render(<ItemGrocery {...defaultProps} />);
};

describe("ItemGrocery", () => {
  describe("rendering", () => {
    it("should render the item title", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "Buy milk" })).toBeInTheDocument();
    });

    it("should render the edit button with the correct aria-label", () => {
      renderComponent({ title: "Buy eggs" });
      expect(screen.getByRole("button", { name: "Edit Buy eggs" })).toBeInTheDocument();
    });

    it("should render the remove button with the correct aria-label", () => {
      renderComponent({ title: "Buy eggs" });
      expect(screen.getByRole("button", { name: "Remove Buy eggs" })).toBeInTheDocument();
    });

    it("should reflect the title in both the heading and button labels", () => {
      renderComponent({ title: "Build a desk" });
      expect(screen.getByRole("heading", { name: "Build a desk" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Edit Build a desk" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Remove Build a desk" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call editItem with the correct id and title when the edit button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent({ id: "42", title: "Buy milk" });
      await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
      expect(mockEditItem).toHaveBeenCalledTimes(1);
      expect(mockEditItem).toHaveBeenCalledWith("42", "Buy milk");
    });

    it("should call removeItem with the correct id when the remove button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent({ id: "42", title: "Buy milk" });
      await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));
      expect(mockRemoveItem).toHaveBeenCalledTimes(1);
      expect(mockRemoveItem).toHaveBeenCalledWith("42");
    });

    it("should not call removeItem when only the edit button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
      expect(mockRemoveItem).not.toHaveBeenCalled();
    });

    it("should not call editItem when only the remove button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));
      expect(mockEditItem).not.toHaveBeenCalled();
    });
  });
});
