import { Action } from 'redux';

import { PrognosisCategoryPayload } from './planning.types';

export enum PlanningActions {
  CreateYear = 'Planning/CreateYear',
  RemoveYear = 'Planning/RemoveYear',
  CreateMonth = 'Planning/CreateMonth',
  RemoveMonth = 'Planning/RemoveMonth',
  CreateCategoryPrognosis = 'Planning/CreateCategoryPrognosis',
  RemoveCategoryPrognosis = 'Planning/RemoveCategoryPrognosis',
  UpdateCategoryPrognosis = 'Planning/UpdateCategoryPrognosis',
}

export type PlanningActionScheme = Action<PlanningActions> & {
  type: PlanningActions;
  payload:
  | number
  | { year: number, month: number }
  | PrognosisCategoryPayload;
}

export const createYear = (year: number): PlanningActionScheme => {
  return {
    type: PlanningActions.CreateYear,
    payload: year,
  };
};

export const removeYear = (year: number): PlanningActionScheme => {
  return {
    type: PlanningActions.RemoveYear,
    payload: year,
  };
};

export const createMonth = (year: number, month: number): PlanningActionScheme => {
  return {
    type: PlanningActions.CreateMonth,
    payload: {
      year,
      month,
    },
  };
};

export const removeMonth = (year: number, month: number): PlanningActionScheme => {
  return {
    type: PlanningActions.RemoveMonth,
    payload: {
      year,
      month,
    },
  };
};

export const createPrognosisCategory = (payload: PrognosisCategoryPayload): PlanningActionScheme => {
  return {
    type: PlanningActions.CreateCategoryPrognosis,
    payload,
  }
}

export const removePrognosisCategory = (payload: Omit<PrognosisCategoryPayload, 'prognosis'>): PlanningActionScheme => {
  return {
    type: PlanningActions.RemoveCategoryPrognosis,
    payload,
  }
}

export const updatePrognosisCategory = (payload: PrognosisCategoryPayload & { newId: string }): PlanningActionScheme => {
  return {
    type: PlanningActions.UpdateCategoryPrognosis,
    payload,
  }
}
