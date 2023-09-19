import { Reducer } from 'redux';

import { StatementState, StatementRecord } from './statement.types';
import { StatementActionScheme, StatementActions } from './actions';

type StatementReducer = Reducer<StatementState, StatementActionScheme>;

const initState: StatementState = {
  items: [],
};

export const statementReducer: StatementReducer = (
  state = initState,
  { type, payload },
) => {
  switch (type) {
    case StatementActions.SetStatement:
      return {
        ...state,
        items: payload as Array<StatementRecord>,
      }
    default:
      return state;
  }
};