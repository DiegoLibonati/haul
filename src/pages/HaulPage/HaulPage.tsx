import { useEffect, useState } from "react";

import type { JSX } from "react";
import type { Alert } from "@/types/app";
import type { EditState } from "@/types/states";

import ItemGrocery from "@/components/ItemGrocery/ItemGrocery";

import { getItemsFromLocalStorage } from "@/helpers/getItemsFromLocalStorage";
import { setLocalStorage } from "@/helpers/setLocalStorage";

import { LOCAL_STORAGE_KEY_ITEMS } from "@/constants/vars";

import "@/pages/HaulPage/HaulPage.css";

const HaulPage = (): JSX.Element => {
  const [items, setItems] = useState(getItemsFromLocalStorage());
  const [edit, setEdit] = useState<EditState>({
    idEdit: "",
    isEditing: false,
  });
  const [alert, setAlert] = useState<Alert>({
    type: "",
    message: "",
    show: false,
  });
  const [form, setForm] = useState({
    name: "",
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const name = target.name;
    const value = target.value;

    setForm((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const isEditing = edit.isEditing;
    const idEdit = edit.idEdit;

    if (!name) {
      setAlert({
        type: "error",
        message: "Invalid entry",
        show: true,
      });
      return;
    }

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

  const handleDeleteItem = (id: string): void => {
    const arr = items.filter((item) => item.id !== id);
    setAlert({ type: "error", message: "Removed successfully", show: true });
    setItems(arr);
  };

  const handleEditItem = (id: string, title: string): void => {
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

    return (): void => {
      clearTimeout(timeout);
    };
  }, [alert.show]);

  useEffect(() => {
    setLocalStorage(LOCAL_STORAGE_KEY_ITEMS, items);
  }, [items]);

  return (
    <main className="haul-page">
      <section className="header-wrapper">
        <h2 className="header-wrapper__title">Haul</h2>

        {alert.show && (
          <h3 className={`header-wrapper__alert header-wrapper__alert--${alert.type}`}>
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
            aria-label="Grocery item name"
            className="header-wrapper__form-input"
            onChange={onInputChange}
          ></input>
          <button
            type="submit"
            aria-label={edit.isEditing ? "Edit item" : "Add item"}
            className="header-wrapper__form-submit"
          >
            {edit.isEditing ? "EDIT" : "SUBMIT"}
          </button>
        </form>
      </section>

      <section className="items">
        {items.map(
          (item): JSX.Element => (
            <ItemGrocery
              key={item.id}
              id={item.id}
              title={item.title}
              removeItem={handleDeleteItem}
              editItem={handleEditItem}
            ></ItemGrocery>
          )
        )}
        {items.length !== 0 && (
          <button
            className="items__btn-clear-items"
            aria-label="Clear all items"
            onClick={handleClearItems}
          >
            Clear Items
          </button>
        )}
      </section>
    </main>
  );
};

export default HaulPage;
