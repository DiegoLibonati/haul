import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import HaulPage from "@/pages/HaulPage/HaulPage";

const renderPage = (): RenderResult => render(<HaulPage />);

describe("HaulPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Haul" })).toBeInTheDocument();
    });

    it("should render the input with the correct placeholder", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Build a desk")).toBeInTheDocument();
    });

    it("should render the submit button in add mode by default", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
    });

    it("should not render the clear items button when there are no items", () => {
      renderPage();
      expect(screen.queryByRole("button", { name: "Clear all items" })).not.toBeInTheDocument();
    });

    it("should not render an alert on initial render", () => {
      renderPage();
      expect(screen.queryByRole("heading", { name: "Added successfully" })).not.toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: "Invalid entry" })).not.toBeInTheDocument();
    });

    it("should render items persisted in localStorage on mount", () => {
      localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
      renderPage();
      expect(screen.getByRole("heading", { name: "Buy milk" })).toBeInTheDocument();
    });

    it("should render the clear items button when localStorage has items on mount", () => {
      localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
      renderPage();
      expect(screen.getByRole("button", { name: "Clear all items" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    describe("adding an item", () => {
      it("should add the item to the list when submitted with a valid name", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.getByRole("heading", { name: "Buy eggs" })).toBeInTheDocument();
      });

      it("should show the success alert after adding an item", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.getByRole("heading", { name: "Added successfully" })).toBeInTheDocument();
      });

      it("should clear the input after adding an item", async () => {
        const user = userEvent.setup();
        renderPage();
        const input = screen.getByLabelText("Grocery item name");
        await user.type(input, "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(input).toHaveValue("");
      });

      it("should show the clear items button after adding an item", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.getByRole("button", { name: "Clear all items" })).toBeInTheDocument();
      });

      it("should show an error alert when submitting an empty input", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.getByRole("heading", { name: "Invalid entry" })).toBeInTheDocument();
      });

      it("should show an error alert when submitting whitespace-only input", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "   ");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.getByRole("heading", { name: "Invalid entry" })).toBeInTheDocument();
      });

      it("should not add an item when the input is whitespace-only", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "   ");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.queryByRole("button", { name: "Clear all items" })).not.toBeInTheDocument();
      });
    });

    describe("editing an item", () => {
      it("should populate the input with the item title when the edit button is clicked", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
        expect(screen.getByLabelText("Grocery item name")).toHaveValue("Buy milk");
      });

      it("should switch the submit button to edit mode when editing", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
        expect(screen.getByRole("button", { name: "Edit item" })).toBeInTheDocument();
      });

      it("should update the item title after confirming the edit", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
        const input = screen.getByLabelText("Grocery item name");
        await user.clear(input);
        await user.type(input, "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Edit item" }));
        expect(screen.getByRole("heading", { name: "Buy eggs" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Buy milk" })).not.toBeInTheDocument();
      });

      it("should show the success alert after editing an item", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
        const input = screen.getByLabelText("Grocery item name");
        await user.clear(input);
        await user.type(input, "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Edit item" }));
        expect(screen.getByRole("heading", { name: "Edit successfully" })).toBeInTheDocument();
      });

      it("should reset the form and exit edit mode after confirming the edit", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Edit Buy milk" }));
        const input = screen.getByLabelText("Grocery item name");
        await user.clear(input);
        await user.type(input, "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Edit item" }));
        expect(input).toHaveValue("");
        expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
      });
    });

    describe("removing an item", () => {
      it("should remove the item from the list", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));
        expect(screen.queryByRole("heading", { name: "Buy milk" })).not.toBeInTheDocument();
      });

      it("should show the error alert after removing an item", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));
        expect(screen.getByRole("heading", { name: "Removed successfully" })).toBeInTheDocument();
      });

      it("should hide the clear items button when the last item is removed", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));
        expect(screen.queryByRole("button", { name: "Clear all items" })).not.toBeInTheDocument();
      });

      it("should only remove the targeted item when multiple items exist", async () => {
        const user = userEvent.setup();
        localStorage.setItem(
          "items",
          JSON.stringify([
            { id: "1", title: "Buy milk" },
            { id: "2", title: "Buy eggs" },
          ])
        );
        renderPage();
        await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));
        expect(screen.queryByRole("heading", { name: "Buy milk" })).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Buy eggs" })).toBeInTheDocument();
      });
    });

    describe("clearing all items", () => {
      it("should remove all items from the list", async () => {
        const user = userEvent.setup();
        localStorage.setItem(
          "items",
          JSON.stringify([
            { id: "1", title: "Buy milk" },
            { id: "2", title: "Buy eggs" },
          ])
        );
        renderPage();
        await user.click(screen.getByRole("button", { name: "Clear all items" }));
        expect(screen.queryByRole("heading", { name: "Buy milk" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Buy eggs" })).not.toBeInTheDocument();
      });

      it("should hide the clear items button after clearing", async () => {
        const user = userEvent.setup();
        localStorage.setItem("items", JSON.stringify([{ id: "1", title: "Buy milk" }]));
        renderPage();
        await user.click(screen.getByRole("button", { name: "Clear all items" }));
        expect(screen.queryByRole("button", { name: "Clear all items" })).not.toBeInTheDocument();
      });
    });

    describe("alert auto-dismiss", () => {
      afterEach(() => {
        jest.useRealTimers();
      });

      it("should hide the alert after 3 seconds", async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        expect(screen.getByRole("heading", { name: "Added successfully" })).toBeInTheDocument();
        act(() => {
          jest.advanceTimersByTime(3001);
        });
        await waitFor(() => {
          expect(
            screen.queryByRole("heading", { name: "Added successfully" })
          ).not.toBeInTheDocument();
        });
      });

      it("should still show the alert before 3 seconds have passed", async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        renderPage();
        await user.type(screen.getByLabelText("Grocery item name"), "Buy eggs");
        await user.click(screen.getByRole("button", { name: "Add item" }));
        act(() => {
          jest.advanceTimersByTime(2999);
        });
        expect(screen.getByRole("heading", { name: "Added successfully" })).toBeInTheDocument();
      });
    });
  });
});
