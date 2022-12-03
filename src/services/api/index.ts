import axios from "axios";
import { authService } from "../features/auth";

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export const uninterceptedAxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

uninterceptedAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("access_token");

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("access_token");

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    try {
      if (err.response.status === 401) {
        const curentRefreshToken = await localStorage.getItem("refresh_token");
        if (curentRefreshToken) {
          const { accessToken, refreshToken } = await authService.refreshToken(
            curentRefreshToken
          );
          authService.storeTokens(accessToken, refreshToken);

          const { headers, ...config } = err.config;

          return api.request({
            ...config,
            headers: { ...headers, Authorization: `Bearer ${accessToken}` },
          });
        }
      }

      return Promise.reject(err.response);
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      return Promise.reject(err.response);
    }
  }
);
