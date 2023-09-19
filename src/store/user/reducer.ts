import { Reducer } from 'redux';

import { UserState } from './types';
import { UserActionScheme, UserActions } from './actions';

type UserReducer = Reducer<UserState, UserActionScheme>;

const initState: UserState = {
  username: '',
};

export const userReducer: UserReducer = (
  state = initState,
  { type, payload },
) => {
  switch (type) {
    case UserActions.SetUsername:
      const { username } = payload as { username: string };
      return {
        ...state,
        username,
      }
    default:
      return state;
  }
};