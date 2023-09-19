import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../../store/store.types';
import { CategoriesState, Category, CategoryType } from '../../../../store/categories/categories.types';
import * as CategoriesActions from '../../../../store/categories/actions';

type Hook = {
  income: Record<string, Category>;
  expenses: Record<string, Category>;
  onAddCategory: (categoryType: CategoryType, name: string) => void;
  onUpdateCategory: (type: CategoryType, id: string, name: string) => void;
  onDeleteCategory: (type: CategoryType, id: string) => void;
}

export const useStore = (): Hook => {
  const dispatch = useDispatch();

  const categories = useSelector<RootState, CategoriesState>(state => state.categories);
  const { income, expenses } = categories;

  const handleAddCategory = (type: CategoryType, name: string): void => {
    if (name) {
      const category: Category = {
        id: `f${(+new Date()).toString(16)}`,
        type,
        name,
      };
      dispatch(CategoriesActions.addCategory(category))
    }
  }

  const handleUpdateCategory = (type: CategoryType, id: string, name: string): void => {
    if (id && name) {
      const category: Category = {
        id,
        type,
        name,
      };
      dispatch(CategoriesActions.updateCategory(category))
    }
  }

  const handleDeleteCategory = (type: CategoryType, id: string): void => {
    if (id && type) {
      dispatch(CategoriesActions.deleteCategory(type, id))
    }
  }

  return {
    income,
    expenses,
    onAddCategory: handleAddCategory,
    onUpdateCategory: handleUpdateCategory,
    onDeleteCategory: handleDeleteCategory,
  }
}