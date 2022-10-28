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
        queryClient.invalidateQueries("fetchTechnicians");
        showNotification({
          title: "Sucesso",
          message: "Registro atualizado com sucesso",
          color: "teal",
          autoClose: true,
        });
        console.log(queryClient);
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
