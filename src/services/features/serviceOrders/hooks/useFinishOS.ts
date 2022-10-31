import { ResponseError } from "@/types/responseError";
import { ServiceOrderFinish, ServiceOrdersCreate } from "@/types/serviceOrders";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { serviceOrdersService } from "..";

type useFinishOSProps = {
  payload: Omit<ServiceOrderFinish, "id">;
  id: number;
};

export const useFinishOS = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ payload, id }: useFinishOSProps) =>
      serviceOrdersService.finishServiceOrder(payload, id),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchOSById");
        showNotification({
          title: "Sucesso",
          message: "Ordem de serviço finalizada com sucesso.",
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
