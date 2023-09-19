import { Action } from 'redux';

export enum UserActions {
  SetUsername = 'User/SetUsername',
}

export type UserActionScheme = Action<UserActions> & {
  type: UserActions;
  payload: {
    username: string;
  }
}

export const setUsername = (username: string): UserActionScheme => {
  return {
    type: UserActions.SetUsername,
    payload: {
      username,
    },
  };
};
