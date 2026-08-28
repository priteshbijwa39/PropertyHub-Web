import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_LIVE_BASE_URL;

interface ApiOptions extends AxiosRequestConfig {}

export const apiClient = async <T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> => {
  const { headers, ...requestOptions } = options;

  const token = useAuthStore.getState().token;
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await axios({
      url: url,
      ...requestOptions,

      headers: {
        ...headers,

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong",
    );
  }
};
