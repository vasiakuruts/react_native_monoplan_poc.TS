import { Action } from 'redux';

export enum AuthActions {
  SetToken = 'Auth/SetToken',
  RemoveToken = 'Auth/RemoveToken',
}

export type AuthActionScheme = Action<AuthActions> & {
  type: AuthActions;
  payload?: string;
}

export const setToken = (token: string): AuthActionScheme => {
  return {
    type: AuthActions.SetToken,
    payload: token,
  };
};

export const removeToken = (): AuthActionScheme => {
  return {
    type: AuthActions.RemoveToken,
  };
};