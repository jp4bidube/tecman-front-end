import { ClientCreatePayload } from "@/types/clients";
import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { clientsService } from "..";

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (client: ClientCreatePayload) =>
      clientsService.postCreateClient(client),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchClients");
        await queryClient.refetchQueries();
        showNotification({
          title: "Sucesso",
          message: "Cliente criado com sucesso",
          color: "teal",
          autoClose: true,
        });
        navigate("/clients");
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
