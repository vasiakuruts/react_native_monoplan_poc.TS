import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { RootState } from '../../../../store/store.types';
import { PlanningState, PlanningYear } from '../../../../store/planning/planning.types';
// import { CategoriesState } from '../../../../store/categories/categories.types';
import * as PlanningActions from '../../../../store/planning/actions';

export type YearTableRecord = {
  year: number;
  income: number;
  expenses: number;
  monthsCount: number;
}

type Hook = {
  plans: Array<YearTableRecord>;
  empty: boolean;
  handleCreateYear: (year: number) => void;
  handleRemoveYear: (year: number) => void;
}

const prepareTableRecords = (plans: Record<number, PlanningYear>): Array<YearTableRecord> => {
  return Object.values(plans).map(({ year, months }) => ({
    year,
    income: Object.values(months).reduce((value, m) => m.balance.income + value, 0),
    expenses: Object.values(months).reduce((value, m) => m.balance.expenses + value, 0),
    monthsCount: Object.values(months).length,
  }))
}

export const useStore = (): Hook => {
  const dispatch = useDispatch();
  const planning = useSelector<RootState, PlanningState>(state => state.planning);
  // const categories = useSelector<RootState, CategoriesState>(state => state.categories);

  const handleCreateYear = React.useCallback((year: number) => {
    dispatch(PlanningActions.createYear(year));
  }, [dispatch]);

  const handleRemoveYear = React.useCallback((year: number) => {
    dispatch(PlanningActions.removeYear(year));
  }, [dispatch]);

  return {
    plans: prepareTableRecords(planning.plans),
    empty: isEmpty(planning.plans),
    handleCreateYear,
    handleRemoveYear,
  }
}