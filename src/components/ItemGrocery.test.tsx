import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ItemGrocery } from "./ItemGrocery";

const mockRemoveItem = jest.fn();
const mockEditItem = jest.fn();

type RenderComponent = {
  props: {
    id: string;
    title: string;
    removeItem: jest.Mock;
    editItem: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    id: "id pepe",
    title: "title pepe",
    removeItem: mockRemoveItem,
    editItem: mockEditItem,
  };

  const { container } = render(
    <ItemGrocery
      id={props.id}
      title={props.title}
      removeItem={props.removeItem}
      editItem={props.editItem}
    ></ItemGrocery>
  );

  return {
    props: props,
    container: container,
  };
};

test("It should render the article title.", () => {
  const { props } = renderComponent();

  const title = screen.getByRole("heading", { name: props.title });

  expect(title).toBeInTheDocument();
});

test("It must render the edit button and execute its function.", async () => {
  const { props } = renderComponent();

  const btnEditItem = screen.getByRole("button", { name: /edit item/i });

  expect(btnEditItem).toBeInTheDocument();

  await user.click(btnEditItem);

  expect(mockEditItem).toHaveBeenCalledTimes(1);
  expect(mockEditItem).toHaveBeenCalledWith(props.id, props.title);
});

test("It must render the remove button and execute its function.", async () => {
  const { props } = renderComponent();

  const btnRemoveItem = screen.getByRole("button", { name: /remove item/i });

  expect(btnRemoveItem).toBeInTheDocument();

  await user.click(btnRemoveItem);

  expect(mockRemoveItem).toHaveBeenCalledTimes(1);
  expect(mockRemoveItem).toHaveBeenCalledWith(props.id);
});
