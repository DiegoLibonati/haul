// Types

export type Alert = {
  type: string;
  message: string;
  show: boolean;
};

export type Item = {
  id: string;
  title: string;
};

export type EditState = {
  idEdit: string;
  isEditing: boolean;
};

export type FormState = {
  name: string;
};
