import { CategoryType } from '../categories/categories.types';

export type PlanningCategory = {
  id: string;
  prognosis: number;
}

export type Balance = {
  income: number;
  expenses: number;
}

export type PlanningMonth = {
  month: number;
  balance: Balance;
  income: Record<string, PlanningCategory>;
  expenses: Record<string, PlanningCategory>;
}

export type PlanningYear = {
  year: number;
  months: Record<number, PlanningMonth>;
};

export type PrognosisCategoryPayload = {
  year: number;
  month: number;
  group: CategoryType;
  id: string;
  prognosis: number;
}

export type PlanningState = {
  plans: Record<number, PlanningYear>;
}
