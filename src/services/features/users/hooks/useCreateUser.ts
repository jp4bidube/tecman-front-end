import { CreateUserPayload } from "@/types/user";
import { showNotification } from "@mantine/notifications";
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
        queryClient.invalidateQueries("users");
        await queryClient.refetchQueries();
        showNotification({
          title: "Sucesso",
          message: "Funcionario criado com sucesso",
          color: "teal",
          autoClose: true,
        });
        navigate("/users");
      },
      onError: () => {
        showNotification({
          title: "Erro",
          message: "Erro inesperado",
          color: "red",
          autoClose: true,
        });
      },
    }
  );
};
