interface DefaultProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ItemGroceryProps {
  id: string;
  title: string;
  removeItem: (id: string) => void;
  editItem: (id: string, title: string) => void;
}
