import { BsTrash, BsPencil } from "react-icons/bs";

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
    <article className="item">
      <h2>{title}</h2>

      <div className="item__btns">
        <button
          type="button"
          aria-label="edit item"
          onClick={() => editItem(id, title)}
        >
          <BsPencil className="item__btn-edit"></BsPencil>
        </button>
        <button
          type="button"
          aria-label="remove item"
          onClick={() => removeItem(id)}
        >
          <BsTrash className="item__btn-delete"></BsTrash>
        </button>
      </div>
    </article>
  );
};
