import React from "react";
import * as Redux from "react-redux";

import { RootState } from "../../../../store/store.types";
import * as GlobalActions from "../../../../store/global/actions";
import * as UserActions from "../../../../store/user/actions";
import { GlobalState } from "../../../../store/global/types";
import { authAPI } from "../../../../api";

interface UseLogin {
  values: {
    username: string;
    password: string;
  };
  isLoading: boolean;
  changeFieldValue: (event: React.FormEvent<HTMLInputElement>) => void;
  login: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export const useLogin = (): UseLogin => {
  const dispatch = Redux.useDispatch();
  const { isLoading } = Redux.useSelector<RootState, GlobalState>(
    (state) => state.global
  );
  const [username, setUsername] = React.useState<string>("john1");
  const [password, setPassword] = React.useState<string>("password");

  const changeFieldValue = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;

      if (name === "username") {
        setUsername(value);
      } else if (name === "password") {
        setPassword(value);
      }
    },
    [setUsername, setPassword]
  );

  const login = React.useCallback(
    async (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (isLoading) {
        return;
      }

      dispatch(GlobalActions.setLoading(true));

      try {
        const res = await authAPI.login({
          username,
          password,
        });

        console.log(res);

        const authState: AuthState = res.status === 200 ? "AUTH" : "NOT-AUTH";

        dispatch(UserActions.setUsername(username));
        dispatch(GlobalActions.setAuth(authState));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(GlobalActions.setLoading(false));
      }
    },
    [username, password, isLoading, dispatch]
  );

  return {
    values: {
      username,
      password,
    },
    isLoading,
    changeFieldValue,
    login,
  };
};
