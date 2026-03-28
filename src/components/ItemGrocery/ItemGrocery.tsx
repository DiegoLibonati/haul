import { BsTrash, BsPencil } from "react-icons/bs";

import { ItemGroceryProps } from "@/types/props";

import "@/components/ItemGrocery/ItemGrocery.css";

const ItemGrocery = ({ id, title, removeItem, editItem }: ItemGroceryProps) => {
  return (
    <article className="item-grocery">
      <h2 className="item-grocery__title">{title}</h2>

      <div className="item__btns">
        <button
          type="button"
          aria-label="edit item"
          className="item-grocery__btn item-grocery__btn-edit"
          onClick={() => editItem(id, title)}
        >
          <BsPencil className="item-grocery__btn-edit-icon"></BsPencil>
        </button>
        <button
          type="button"
          aria-label="remove item"
          className="item-grocery__btn item-grocery__btn-remove"
          onClick={() => removeItem(id)}
        >
          <BsTrash className="item-grocery__btn-remove-icon"></BsTrash>
        </button>
      </div>
    </article>
  );
};

export default ItemGrocery;
