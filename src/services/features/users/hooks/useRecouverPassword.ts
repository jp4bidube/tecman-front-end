import useStore from "@/store";
import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { usersService } from "..";
import { authService } from "../../auth";

export const useRecouverPassword = () => {
  const store = useStore();

  return useMutation(
    async (cpf: string) => usersService.postRecouverPassword(cpf),
    {
      onSuccess: async (res) => {
        showNotification({
          title: "Sucesso",
          message: "Usuário encontrado",
          color: "teal",
          autoClose: true,
        });
        const { employeeId, userId, username, recoveryToken } = res;

        await authService.storeTokens(recoveryToken!, "");
        store.setRecouverPassword({ employeeId, userId, username });
      },
      onError: ({ data }: AxiosResponse<ResponseError>) => {
        showNotification({
          title: "Erro",
          message: data.message,
          color: "red",
          autoClose: true,
        });
      },
    }
  );
};
