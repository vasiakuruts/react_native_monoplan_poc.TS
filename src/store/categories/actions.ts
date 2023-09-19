import { Action } from 'redux';

import { Category, CategoryType } from './categories.types';

export enum CategoryActions {
  AddCategory = 'Categories/AddCategory',
  UpdateCategory = 'Categories/UpdateCategory',
  DeleteCategory = 'Categories/DeleteCategory',
}

export type CategoryActionScheme = Action<CategoryActions> & {
  type: CategoryActions;
  payload: Category | { type: string, id: string };
}

export const addCategory = (category: Category): CategoryActionScheme => {
  return {
    type: CategoryActions.AddCategory,
    payload: category,
  };
};

export const updateCategory = (category: Category): CategoryActionScheme => {
  return {
    type: CategoryActions.UpdateCategory,
    payload: category,
  };
};

export const deleteCategory = (type: CategoryType, id: string): CategoryActionScheme => {
  return {
    type: CategoryActions.DeleteCategory,
    payload: {
      type,
      id,
    },
  };
};
