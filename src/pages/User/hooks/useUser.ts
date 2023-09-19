import React from 'react';
import * as Redux from 'react-redux';

import { RootState } from '../../../store/store.types'
import * as GlobalActions from '../../../store/global/actions';
import { GlobalState } from '../../../store/global/types'
import { UserState } from '../../../store/user/types'
import { authAPI } from '../../../api';

interface UseUser {
  username: string;
  // isAuth: boolean;
  logout: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export const useUser = (): UseUser => {
  const dispatch = Redux.useDispatch();
  const { isLoading } = Redux.useSelector<RootState, GlobalState>(state => state.global);
  const { username } = Redux.useSelector<RootState, UserState>(state => state.user);

  const logout = React.useCallback(async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    dispatch(GlobalActions.setLoading(true));

    try {
      await authAPI.logout();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(GlobalActions.setAuth('UNDEFINED'));
      dispatch(GlobalActions.setLoading(false));
    }
  }, [dispatch, isLoading]);

  return {
    username,
    // isAuth: authState === 'AUTH',
    logout,
  }
}