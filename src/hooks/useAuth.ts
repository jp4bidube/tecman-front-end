import { authService } from "@/services/features/auth";

export const useIsAuth = () => {
  const { accessToken, refreshToken } = authService.getTokens();
  if (accessToken && refreshToken) {
    return true;
  }
  return false;
};
