import { ResponseError } from "@/types/responseError";
import {
  ServiceOrderFinish,
  ServiceOrdersCreate,
  WarrantyVisit,
} from "@/types/serviceOrders";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { serviceOrdersService } from "..";

export const useCreateWarranty = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: WarrantyVisit) =>
      serviceOrdersService.createWarrantyVisit(payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchOSGarantees");
        showNotification({
          title: "Sucesso",
          message: "Serviço de garantia cadastrado com sucesso.",
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
