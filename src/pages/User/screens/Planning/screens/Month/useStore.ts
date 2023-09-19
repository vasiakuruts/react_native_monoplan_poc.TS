import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { RootState } from '../../../../../../store/store.types';
import { CategoriesState, Category, CategoryType } from '../../../../../../store/categories/categories.types';
import { PlanningState, PlanningCategory } from '../../../../../../store/planning/planning.types';
import * as PlanningActions from '../../../../../../store/planning/actions';

export type CalculatedPlanningGroup = {
  prognosis: number;
  categories: Record<string, PlanningCategory & { name: string }>;
  all: Record<string, Category>;
}

type Hook = {
  invalid: boolean;
  income?: CalculatedPlanningGroup;
  expenses?: CalculatedPlanningGroup;
  handleAddCategoryPrognosis: (group: CategoryType, id: string, prognosis: number) => void;
  handleRemoveCategoryPrognosis: (group: CategoryType, id: string) => void;
  handleUpdateCategoryPrognosis: (group: CategoryType, id: string, newId: string, prognosis: number) => void;
}

const calculateCategories = (
  planningCategories: Record<string, PlanningCategory>,
  categories: Record<string, Category>,
): CalculatedPlanningGroup => {
  const res: CalculatedPlanningGroup = {
    prognosis: 0,
    categories: {},
    all: categories,
  };

  if (!isEmpty(planningCategories)) {
    Object.values(planningCategories).forEach(({ id, prognosis }) => {

      const name = categories[id].name;

      res.prognosis += Number.isInteger(prognosis) ? prognosis : parseInt(prognosis as any);
      res.categories = Object.assign(res.categories, {
        [id]: {
          id,
          prognosis,
          name,
        }
      });
    });
  }

  return res;
}

export const useStore = (year: string | undefined, month: string | undefined): Hook => {
  const dispatch = useDispatch();

  const yearKey = year ? parseInt(year) : NaN;
  const monthKey = month ? parseInt(month) : NaN;

  const planning = useSelector<RootState, PlanningState>(state => state.planning);
  const categories = useSelector<RootState, CategoriesState>(state => state.categories);

  const handleAddCategoryPrognosis = React.useCallback((group: CategoryType, id: string, prognosis: number) => {
    if (yearKey !== NaN && monthKey !== NaN) {
      const data = {
        year: yearKey,
        month: monthKey,
        group,
        id,
        prognosis,
      };
      dispatch(PlanningActions.createPrognosisCategory(data));
    }
  }, []);

  const handleRemoveCategoryPrognosis = React.useCallback((group: CategoryType, id: string) => {
    if (yearKey !== NaN && monthKey !== NaN) {
      const data = {
        year: yearKey,
        month: monthKey,
        group,
        id,
      };
      dispatch(PlanningActions.removePrognosisCategory(data))
    }
  }, []);

  const handleUpdateCategoryPrognosis = React.useCallback((group: CategoryType, id: string, newId: string, prognosis: number) => {
    if (yearKey !== NaN && monthKey !== NaN) {
      const data = {
        year: yearKey,
        month: monthKey,
        group,
        id,
        newId,
        prognosis,
      };
      dispatch(PlanningActions.updatePrognosisCategory(data))
    }
  }, []);

  if (!planning.plans[yearKey] || !planning.plans[yearKey].months[monthKey]) {
    return {
      invalid: true,
      handleAddCategoryPrognosis,
      handleRemoveCategoryPrognosis,
      handleUpdateCategoryPrognosis,
    }
  }

  const monthPlan = planning.plans[yearKey].months[monthKey];
  console.log(monthPlan)
  const { income, expenses } = monthPlan;

  return {
    invalid: false,
    income: calculateCategories(income, categories.income),
    expenses: calculateCategories(expenses, categories.expenses),
    handleAddCategoryPrognosis,
    handleRemoveCategoryPrognosis,
    handleUpdateCategoryPrognosis,
  }
}