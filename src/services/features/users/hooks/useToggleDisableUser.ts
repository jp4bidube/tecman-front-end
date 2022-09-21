import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { usersService } from "..";

export const useToggleDisableUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => usersService.patchToggleDisableUser(id),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchUsers");
        showNotification({
          title: "Sucesso",
          message: "Usuário atualizado com sucesso",
          color: "teal",
          autoClose: true,
        });
        console.log(queryClient);
      },
      onError: (err) => {
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
