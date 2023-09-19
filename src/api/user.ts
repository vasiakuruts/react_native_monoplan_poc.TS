import { client } from './client';

interface User {
  user: {
    username: string;
  }
}

export const getProfile = async () => {
  return client.get<User>('/user/profile');
}

export const userAPI = {
  getProfile,
}
