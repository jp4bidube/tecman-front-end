import { authService } from "@/services/features/auth";
import { LoginPayload } from "@/types/auth";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";

export const useSignIn = () => {
  return useMutation(
    async (payload: LoginPayload) => authService.signIn(payload),
    {
      onSuccess: async (res) => {
        await authService.storeTokens(res.accessToken, res.refreshToken);
        showNotification({
          title: "Bem vindo",
          message: `${res.name}`,
          color: "green",
          autoClose: true,
        });
      },
      onError: () => {
        showNotification({
          title: "Erro",
          message: "Credenciais de usuário inválidas",
          color: "red",
          autoClose: true,
        });
      },
    }
  );
};
