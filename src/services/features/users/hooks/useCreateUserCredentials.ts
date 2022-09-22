import { ResponseError } from "@/types/responseError";
import { UserCredentialsPayload } from "@/types/user";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { usersService } from "..";

export const useCreateUserCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (user: UserCredentialsPayload) =>
      usersService.postCreateUserCredentials(user),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchUserById");
        showNotification({
          title: "Sucesso",
          message: "Credenciais criadas com sucesso",
          color: "teal",
          autoClose: true,
        });
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
