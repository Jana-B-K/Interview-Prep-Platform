import { API } from './axios';

type UserRole = 'admin' | 'user';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface LoginResponse {
  accessToken: string;
  user: {
    role: UserRole;
  };
}

const parseLoginResponse = (data: unknown): LoginResponse => {
  const response = data as LoginResponse;
  if (!response?.accessToken || !response?.user?.role) {
    throw new Error('Invalid login response from server. Check API base URL and backend /auth/login response.');
  }
  return response;
};

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await API.post('/auth/login', data);
  return parseLoginResponse(response.data);
};

export const register = async (data: RegisterPayload) => {
  const response = await API.post('/auth/register', data);
  return response.data;
};
