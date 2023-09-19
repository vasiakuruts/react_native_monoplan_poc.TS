import React from "react";
import * as Redux from "react-redux";

import { RootState } from "../../../../store/store.types";
import * as GlobalActions from "../../../../store/global/actions";
import * as UserActions from "../../../../store/user/actions";
import { GlobalState } from "../../../../store/global/types";
import { authAPI } from "../../../../api";

interface UseSignup {
  values: {
    username: string;
    password: string;
    password2: string;
  };
  isLoading: boolean;
  changeFieldValue: (event: React.FormEvent<HTMLInputElement>) => void;
  signup: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export const useSignup = (): UseSignup => {
  const dispatch = Redux.useDispatch();
  const { isLoading } = Redux.useSelector<RootState, GlobalState>(
    (state) => state.global
  );
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [password2, setPassword2] = React.useState<string>("");

  const changeFieldValue = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;

      if (name === "username") {
        setUsername(value);
      } else if (name === "password") {
        setPassword(value);
      } else if (name === "password2") {
        setPassword2(value);
      }
    },
    [setUsername, setPassword, setPassword2]
  );

  const signup = React.useCallback(
    async (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (isLoading) {
        return;
      }

      dispatch(GlobalActions.setLoading(true));

      try {
        const res = await authAPI.signup({
          username,
          password,
          password2,
        });

        const isCreated = res.status === 201;

        if (isCreated) {
          const res2 = await authAPI.login({
            username,
            password,
          });

          const authState: AuthState =
            res2.status === 200 ? "AUTH" : "NOT-AUTH";

          dispatch(UserActions.setUsername(username));
          dispatch(GlobalActions.setAuth(authState));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(GlobalActions.setLoading(false));
      }
    },
    [username, password, password2, isLoading, dispatch]
  );

  return {
    values: {
      username,
      password,
      password2,
    },
    isLoading,
    changeFieldValue,
    signup,
  };
};
