import { useEffect, useState } from "react";

import { Alert, Item } from "@src/entities/app";
import { EditState, FormState } from "@src/entities/states";

import { ItemGrocery } from "@src/components/ItemGrocery/ItemGrocery";

import { getItemsFromLocalStorage } from "@src/helpers/getItemsFromLocalStorage";
import { setLocalStorage } from "@src/helpers/setLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "@src/constants/vars";

import "@src/pages/GroceryBudPage/GroceryBudPage.css";

export const GroceryBudPage = () => {
  const [items, setItems] = useState<Item[]>(getItemsFromLocalStorage());
  const [edit, setEdit] = useState<EditState>({
    idEdit: "",
    isEditing: false,
  });
  const [alert, setAlert] = useState<Alert>({
    type: "",
    message: "",
    show: false,
  });
  const [form, setForm] = useState<FormState>({
    name: "",
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const name = target.name;
    const value = target.value;

    setForm((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const isEditing = edit.isEditing;
    const idEdit = edit.idEdit;

    if (!name)
      return setAlert({
        type: "error",
        message: "Invalid entry",
        show: true,
      });

    if (isEditing) {
      setAlert({
        type: "success",
        message: "Edit successfully",
        show: true,
      });

      const itemsEdited = items.map((item) => {
        if (item.id === idEdit) item.title = name;
        return item;
      });

      setItems(itemsEdited);
      setForm((state) => ({ ...state, name: "" }));
      setEdit((state) => ({ ...state, idEdit: "", isEditing: false }));

      return;
    }

    setAlert({
      type: "success",
      message: "Added successfully",
      show: true,
    });

    const id = new Date().getTime().toString();
    const newItem = { id: id, title: name };

    setItems((state) => [...state, newItem]);
    setForm((state) => ({ ...state, name: "" }));
  };

  const handleDeleteItem = (id: string) => {
    const arr = items.filter((item) => item.id !== id);
    setAlert({ type: "error", message: "Removed successfully", show: true });
    setItems(arr);
  };

  const handleEditItem = (id: string, title: string) => {
    setEdit((state) => ({ ...state, idEdit: id, isEditing: true }));
    setForm((state) => ({ ...state, name: title }));
  };

  const handleClearItems: React.MouseEventHandler<HTMLButtonElement> = () => {
    setItems([]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ type: "", message: "", show: false });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert.show]);

  useEffect(() => {
    setLocalStorage<Item[]>(LOCAL_STORAGE_KEY_ITEMS, items);
  }, [items]);

  return (
    <main className="grocery-bud-page">
      <section className="header-wrapper">
        <h2 className="header-wrapper__title">Grocery Bud</h2>

        {alert.show && (
          <h3
            className={`header-wrapper__alert header-wrapper__alert--${alert.type}`}
          >
            {alert.message}
          </h3>
        )}

        <form className="header-wrapper__form" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            value={form.name}
            name="name"
            placeholder="Build a desk"
            className="header-wrapper__form-input"
            onChange={onInputChange}
          ></input>
          <button
            type="submit"
            aria-label="submit"
            className="header-wrapper__form-submit"
          >
            {edit.isEditing ? "EDIT" : "SUBMIT"}
          </button>
        </form>
      </section>

      <section className="items">
        {items?.map((item) => (
          <ItemGrocery
            key={item.id}
            id={item.id}
            title={item.title}
            removeItem={handleDeleteItem}
            editItem={handleEditItem}
          ></ItemGrocery>
        ))}
        {items?.length !== 0 && (
          <button
            className="items__btn-clear-items"
            aria-label="clear items"
            onClick={handleClearItems}
          >
            Clear Items
          </button>
        )}
      </section>
    </main>
  );
};
