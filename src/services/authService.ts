import { API_ENDPOINTS } from "../utils/url";
import { apiClient } from "./apiClient";


export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
   name?: string;
  email: string;
  password: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
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


export const forgotPasswordApi = async (
  payload: {
    email: string;
  },
) => {
  console.log("Forgot Password API called with payload:", payload);
  // const response = await apiClient.post(
  //   "/auth/forgot-password",
  //   payload,
  // );

  // return response.data;
};

export const resetPasswordApi = async (
  payload: {
    token: string;
    password: string;
  },
) => {
  console.log("Reset Password API called with payload:", payload);
  // const response = await apiClient.post(
  //   "/auth/reset-password",
  //   payload,
  // );

  // return response.data;
};