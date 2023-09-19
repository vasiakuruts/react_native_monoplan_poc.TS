import { AuthState } from "./auth/auth.types";
import { UserState } from "./user/types";
import { StatementState } from "./statement/statement.types";
import { PlanningState } from "./planning/planning.types";
import { CategoriesState } from "./categories/categories.types";
import { GlobalState } from "./global/types";

export type RootState = {
  auth: AuthState;
  user: UserState;
  statement: StatementState;
  planning: PlanningState;
  categories: CategoriesState;
  global: GlobalState;
};
