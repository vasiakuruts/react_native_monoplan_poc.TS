import { Action } from 'redux';

import { StatementRecord } from './statement.types';

export enum StatementActions {
  SetStatement = 'Statement/SetStatement',
}

export type StatementActionScheme = Action<StatementActions> & {
  type: StatementActions;
  payload: Array<StatementRecord>;
}

export const setStatement = (items: Array<StatementRecord>): StatementActionScheme => {
  return {
    type: StatementActions.SetStatement,
    payload: items,
  };
};
