import { Reducer } from 'redux';

import { CategoriesState, Category, CategoryType } from './categories.types';
import { CategoryActionScheme, CategoryActions } from './actions';

type StatementReducer = Reducer<CategoriesState, CategoryActionScheme>;

const initState: CategoriesState = {
  income: {},
  expenses: {},
};

export const categoriesReducer: StatementReducer = (
  state = initState,
  { type, payload },
) => {
  switch (type) {
    case CategoryActions.AddCategory: {
      const category = payload as Category;

      if (state[category.type][category.id]) {
        return state;
      }

      return {
        ...state,
        [category.type]: {
          ...state[category.type],
          [category.id]: category,
        },
      }
    }
    case CategoryActions.UpdateCategory: {
      const category = payload as Category;

      if (!state[category.type][category.id]) {
        return state;
      }

      return {
        ...state,
        [category.type]: {
          ...state[category.type],
          [category.id]: category,
        },
      }
    }
    case CategoryActions.DeleteCategory: {
      const { id, type } = payload as { id: string, type: CategoryType };

      if (!state[type][id]) {
        return state;
      }

      const group = state[type];
      delete group[id];

      return {
        ...state,
        [type]: group,
      }
    }
    default:
      return state;
  }
};