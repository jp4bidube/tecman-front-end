import { ClientAddressUpdatePayload } from "@/types/clients";
import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { clientsService } from "..";

type useUpdateClientAddressProps = {
  payload: ClientAddressUpdatePayload;
  id: string;
};

export const useUpdateClientAddress = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ id, payload }: useUpdateClientAddressProps) =>
      clientsService.putUpdateClientAddress(id, payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchClientById");
        showNotification({
          title: "Sucesso",
          message: "Endereço atualizado com sucesso",
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
