import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { clientsService } from "..";

export const useDeleteClientAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => clientsService.putDeleteClientAddress(id),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchClientById");
        showNotification({
          title: "Sucesso",
          message: "Endereço excluído com sucesso",
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
