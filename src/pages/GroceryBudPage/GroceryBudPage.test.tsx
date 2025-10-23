import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Item } from "@src/entities/app";

import { GroceryBudPage } from "@src/pages/GroceryBudPage/GroceryBudPage";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<GroceryBudPage></GroceryBudPage>);

  return { container: container };
};

describe("GroceryBudPage.ts", () => {
  describe("General Tests.", () => {
    const item: Item = {
      id: "123",
      title: "title",
    };

    test("It must render the main container of the APP.", () => {
      renderComponent();

      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("grocery-bud-page");
    });

    test("It must render the title of the APP.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /grocery bud/i });

      expect(heading).toBeInTheDocument();
    });

    test("It should not render the alert as it has no content.", () => {
      renderComponent();

      const headings = screen.getAllByRole("heading");
      const alert = headings.find((heading) =>
        heading.classList.contains("alert")
      );

      expect(alert).toBeUndefined();
    });

    test("It must render the input name and the submit button.", () => {
      renderComponent();

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit/i });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(btnSubmit).toHaveTextContent("SUBMIT");
    });

    test("A new item should be rendered when it is added to the list, and the 'clear items' button should appear.", async () => {
      const { container } = renderComponent();

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit/i });

      const itemsContainer = container.querySelector<HTMLElement>(".items");
      const btnClearItems = screen.queryByRole("button", {
        name: /clear items/i,
      });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(btnSubmit).toHaveTextContent("SUBMIT");
      expect(itemsContainer?.children).toHaveLength(0);
      expect(btnClearItems).not.toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(item.title);

      await user.click(btnSubmit);

      expect(itemsContainer?.children).toHaveLength(2);
      expect(
        screen.getByRole("button", { name: /clear items/i })
      ).toBeInTheDocument();
    });

    test("It must edit an item in the list.", async () => {
      const newTitle = "1234567890";

      const { container } = renderComponent();

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit/i });
      const itemsContainer = container.querySelector<HTMLElement>(".items");
      const btnClearItems = screen.queryByRole("button", {
        name: /clear items/i,
      });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(btnSubmit).toHaveTextContent("SUBMIT");
      expect(itemsContainer?.children).toHaveLength(0);
      expect(btnClearItems).not.toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(item.title);

      await user.click(btnSubmit);

      const btnEdit = screen.getByRole("button", { name: /edit item/i });

      expect(btnEdit).toBeInTheDocument();

      await user.click(btnEdit);

      expect(btnSubmit).toHaveTextContent("EDIT");

      await user.clear(input);
      await user.click(input);
      await user.keyboard(newTitle);

      await user.click(btnSubmit);

      const heading = screen.getByRole("heading", { name: newTitle });

      expect(heading).toBeInTheDocument();
    });

    test("It must clear all items by clicking 'clear items'.", async () => {
      const { container } = renderComponent();

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit/i });
      const itemsContainer = container.querySelector<HTMLElement>(".items");
      const btnClearItems = screen.queryByRole("button", {
        name: /clear items/i,
      });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(btnSubmit).toHaveTextContent("SUBMIT");
      expect(itemsContainer?.children).toHaveLength(0);
      expect(btnClearItems).not.toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(item.title);

      await user.click(btnSubmit);

      const btnClearItemsShowing = screen.getByRole("button", {
        name: /clear items/i,
      });

      expect(itemsContainer?.children).toHaveLength(2);
      expect(btnClearItemsShowing).toBeInTheDocument();

      await user.click(btnClearItemsShowing);

      expect(itemsContainer?.children).toHaveLength(0);
      expect(btnClearItemsShowing).not.toBeInTheDocument();
    });

    test("It must delete an item when you click on its delete button.", async () => {
      const { container } = renderComponent();

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit/i });
      const itemsContainer = container.querySelector<HTMLElement>(".items");
      const btnClearItems = screen.queryByRole("button", {
        name: /clear items/i,
      });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(btnSubmit).toHaveTextContent("SUBMIT");
      expect(itemsContainer?.children).toHaveLength(0);
      expect(btnClearItems).not.toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(item.title);

      await user.click(btnSubmit);

      expect(itemsContainer?.children).toHaveLength(2);

      const btnDeleteItem = screen.getByRole("button", {
        name: /remove item/i,
      });

      expect(btnDeleteItem).toBeInTheDocument();

      await user.click(btnDeleteItem);

      expect(itemsContainer?.children).toHaveLength(0);
      expect(btnClearItems).not.toBeInTheDocument();
    });
  });
});
