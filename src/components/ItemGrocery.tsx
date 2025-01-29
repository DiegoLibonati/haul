import { BsTrash, BsPencil } from "react-icons/bs";

import "./ItemGrocery.css";

interface ItemGroceryProps {
  id: string;
  title: string;
  removeItem: (id: string) => void;
  editItem: (id: string, title: string) => void;
}

export const ItemGrocery = ({
  id,
  title,
  removeItem,
  editItem,
}: ItemGroceryProps): JSX.Element => {
  return (
    <article className="item-grocery">
      <h2 className="item-grocery__title">{title}</h2>

      <div className="item__btns">
        <button
          type="button"
          aria-label="edit item"
          className="item-grocery__btn-edit"
          onClick={() => editItem(id, title)}
        >
          <BsPencil className="item-grocery__btn-edit-icon"></BsPencil>
        </button>
        <button
          type="button"
          aria-label="remove item"
          className="item-grocery__btn-remove"
          onClick={() => removeItem(id)}
        >
          <BsTrash className="item-grocery__btn-remove-icon"></BsTrash>
        </button>
      </div>
    </article>
  );
};
