import { Action } from 'redux';

export enum GlobalActions {
  SetLoading = 'Global/SetLoading',
  SetAuth = 'Global/SetAuth',
  SetError = 'Global/SetError',
}

export type GlobalActionScheme = Action<GlobalActions> & {
  type: GlobalActions;
  payload: {
    isLoading: boolean
  } | {
    authState: AuthState
  } | {
    error?: string
  };
}

export const setLoading = (isLoading: boolean): GlobalActionScheme => {
  return {
    type: GlobalActions.SetLoading,
    payload: {
      isLoading
    },
  };
};

export const setAuth = (authState: AuthState): GlobalActionScheme => {
  return {
    type: GlobalActions.SetAuth,
    payload: {
      authState,
    },
  };
};

export const setError = (error: string): GlobalActionScheme => {
  return {
    type: GlobalActions.SetError,
    payload: {
      error,
    },
  };
};

export const clearError = (): GlobalActionScheme => {
  return {
    type: GlobalActions.SetError,
    payload: {
      error: undefined,
    },
  };
};
