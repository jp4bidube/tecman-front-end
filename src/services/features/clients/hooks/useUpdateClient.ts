import { ClientUpdatePayload } from "@/types/clients";
import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { clientsService } from "..";

type useUpdateProps = {
  payload: ClientUpdatePayload;
  id: number;
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ id, payload }: useUpdateProps) =>
      clientsService.putUpdateClient(id, payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchClients");
        queryClient.invalidateQueries("fetchClientById");
        showNotification({
          title: "Sucesso",
          message: "Cliente atualizado com sucesso",
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
