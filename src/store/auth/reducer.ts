import { Reducer } from 'redux';

import { AuthState } from './auth.types';
import { AuthActionScheme, AuthActions } from './actions';

type AuthReducer = Reducer<AuthState, AuthActionScheme>;

const initState: AuthState = {
  token: '',
};

export const authReducer: AuthReducer = (
  state = initState,
  { type, payload },
) => {
  switch (type) {
    case AuthActions.SetToken:
      return {
        ...state,
        token: payload as string,
      }
    case AuthActions.RemoveToken:
      return {
        ...state,
        token: null,
      }
    default:
      return state;
  }
};
