import { ResponseError } from "@/types/responseError";
import { CreateUserPayload } from "@/types/user";
import { showNotification } from "@mantine/notifications";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { usersService } from "..";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (user: CreateUserPayload) => usersService.postCreateUser(user),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchUsers");
        await queryClient.refetchQueries();
        showNotification({
          title: "Sucesso",
          message: "Funcionario criado com sucesso",
          color: "teal",
          autoClose: true,
        });
        navigate("/users");
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
