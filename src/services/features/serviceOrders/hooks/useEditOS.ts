import { ResponseError } from "@/types/responseError";
import { ServiceOrdersEdit } from "@/types/serviceOrders";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { serviceOrdersService } from "..";

export const useEditOS = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: ServiceOrdersEdit) =>
      serviceOrdersService.editServiceOrder(payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchOSById");
        showNotification({
          title: "Sucesso",
          message: "Ordem de serviço atualizada com sucesso.",
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
