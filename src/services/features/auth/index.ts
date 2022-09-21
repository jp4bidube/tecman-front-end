import { api, uninterceptedAxiosInstance } from "@/services/api";
import axios from "axios";
import { LoginPayload } from "@/types/auth";

type AuthPayload = {
  authenticated: boolean;
  userId: number;
  userStatus: number;
  userProfile: number;
  userName: string;
  expiration: string;
  accessToken: string;
  refreshToken: string;
};

class AuthService {
  async signIn(payload: LoginPayload): Promise<AuthPayload> {
    const { data } = await api.post("/User/Signin", payload);

    return data.result;
  }

  storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  }
  getTokens() {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    return { accessToken, refreshToken };
  }

  async logout() {
    await uninterceptedAxiosInstance.get("/User/Logout");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  async refreshToken(refreshToken: string): Promise<AuthPayload> {
    console.log(refreshToken);
    const { data } = await uninterceptedAxiosInstance.get(
      `/User/Refresh/${refreshToken}`
    );
    return data.result;
  }
}

export const authService = new AuthService();
