import { API_ENDPOINTS } from "../utils/url";
import { apiClient } from "./apiClient";


export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface SignupResponse {
  message: string;
  user: User;
}

export const loginApi = (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  return apiClient<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    data: credentials,
  });
};

export const signupApi = (
  data: SignupRequest,
): Promise<SignupResponse> => {
  return apiClient<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, {
    method: "POST",
    data,
  });
};