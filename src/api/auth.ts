import { client } from './client';

interface LoginOpts {
  username: string;
  password: string;
}

interface SignupOpts {
  username: string;
  password: string;
  password2: string;
}

export const login = async (body: LoginOpts) => {
  return client.post<{}>('/auth/login', body);
}

export const signup = async (body: SignupOpts) => {
  return client.post<{}>('/auth/signup', body);
}

export const logout = async () => {
  return client.get<{}>('/auth/logout');
}

export const authAPI = {
  login,
  signup,
  logout,
}
