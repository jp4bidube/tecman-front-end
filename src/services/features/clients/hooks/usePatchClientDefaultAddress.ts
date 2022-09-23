import { ClientAddressPayload } from "@/types/clients";
import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { clientsService } from "..";

type usePatchClientDefaultAddressProps = {
  payload: { addressId: number };
  id: number;
};

export const usePatchClientDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, payload }: usePatchClientDefaultAddressProps) =>
      clientsService.patchUpdateClientAddress(id, payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchClientById");
        showNotification({
          title: "Sucesso",
          message: "Endereço atualizado com sucesso",
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
