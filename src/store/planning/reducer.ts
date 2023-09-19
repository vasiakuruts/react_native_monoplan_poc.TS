import { Reducer } from 'redux';

import { CategoryType } from '../categories/categories.types';

import { PlanningState, PlanningYear, PlanningMonth, PrognosisCategoryPayload } from './planning.types';
import { PlanningActionScheme, PlanningActions } from './actions';

type PlanningReducer = Reducer<PlanningState, PlanningActionScheme>;

const initState: PlanningState = {
  plans: {}
};

export const planningReducer: PlanningReducer = (
  state = initState,
  { type, payload },
) => {
  switch (type) {
    case PlanningActions.CreateYear: {
      const year = payload as number

      if (state.plans[year]) {
        return state;
      }

      const newYear: PlanningYear = {
        year,
        months: {}
      };

      return {
        ...state,
        plans: {
          ...state.plans,
          [year]: newYear,
        }
      }
    }
    case PlanningActions.RemoveYear: {
      const year = payload as number;

      if (!state.plans[year]) {
        return state;
      }

      const plans = state.plans;
      delete plans[year];

      return {
        ...state,
        plans,
      }
    }
    case PlanningActions.CreateMonth: {
      const { year, month } = payload as { year: number, month: number };

      if (!state.plans[year]) {
        return state;
      }
      if (month < 0 || month > 11) {
        return state;
      }

      const newMonth: PlanningMonth = {
        month,
        balance: {
          income: 0,
          expenses: 0,
        },
        income: {},
        expenses: {},
      };

      return {
        ...state,
        plans: {
          ...state.plans,
          [year]: {
            year,
            months: {
              ...state.plans[year].months,
              [month]: newMonth,
            }
          }
        }
      }
    }
    case PlanningActions.RemoveMonth: {
      const { year, month } = payload as { year: number, month: number };

      if (!state.plans[year]) {
        return state;
      }
      if (month < 0 || month > 11) {
        return state;
      }

      const months = state.plans[year].months;
      delete months[month];

      return {
        ...state,
        plans: {
          ...state.plans,
          [year]: {
            year,
            months,
          }
        }
      }
    }
    case PlanningActions.CreateCategoryPrognosis: {
      const { year, month, group, id, prognosis } = payload as PrognosisCategoryPayload;

      if (!state.plans[year]
        || !state.plans[year].months[month]
        || !state.plans[year].months[month][group]
        || state.plans[year].months[month][group][id]) {
        return state;
      }

      return {
        ...state,
        plans: {
          ...state.plans,
          [year]: {
            year,
            months: {
              ...state.plans[year].months,
              [month]: {
                ...state.plans[year].months[month],
                balance: {
                  ...state.plans[year].months[month].balance,
                  [group]: state.plans[year].months[month].balance[group] + prognosis,
                },
                [group]: {
                  ...state.plans[year].months[month][group],
                  [id]: {
                    id,
                    prognosis,
                  },
                }
              }
            },
          }
        }
      }
    }
    case PlanningActions.RemoveCategoryPrognosis: {
      const { year, month, group, id } = payload as Omit<PrognosisCategoryPayload, 'prognosis'>;

      if (!state.plans[year]
        || !state.plans[year].months[month]
        || !state.plans[year].months[month][group]
        || !state.plans[year].months[month][group][id]) {
        return state;
      }

      const categories = state.plans[year].months[month][group];
      const { prognosis } = categories[id];
      delete categories[id];

      return {
        ...state,
        plans: {
          ...state.plans,
          [year]: {
            year,
            months: {
              ...state.plans[year].months,
              [month]: {
                ...state.plans[year].months[month],
                balance: {
                  ...state.plans[year].months[month].balance,
                  [group]: state.plans[year].months[month].balance[group] - prognosis,
                },
                [group]: categories,
              }
            }
          }
        }
      }
    }
    case PlanningActions.UpdateCategoryPrognosis: {
      const { year, month, group, id, prognosis, newId } = payload as PrognosisCategoryPayload & { newId: string };

      if (!state.plans[year]
        || !state.plans[year].months[month]
        || !state.plans[year].months[month][group]
        || !state.plans[year].months[month][group][id]) {
        return state;
      }

      const categories = state.plans[year].months[month][group];
      const { prognosis: oldPrognosis } = state.plans[year].months[month][group][id];

      if (id !== newId) {
        categories[newId] = {
          id: newId,
          prognosis,
        };
        delete categories[id];
      } else {
        categories[id].prognosis = prognosis;
      }

      return {
        ...state,
        plans: {
          ...state.plans,
          [year]: {
            year,
            months: {
              ...state.plans[year].months,
              [month]: {
                ...state.plans[year].months[month],
                balance: {
                  ...state.plans[year].months[month].balance,
                  [group]: state.plans[year].months[month].balance[group] - oldPrognosis + prognosis,
                },
                [group]: categories,
              }
            }
          }
        }
      }
    }
    default:
      return state;
  }
};