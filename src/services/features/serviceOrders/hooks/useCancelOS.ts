import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { serviceOrdersService } from "..";

type useCancelOSProps = {
  payload: { date: Date; obs: string };
  id: number;
};

export const useCancelOS = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ payload, id }: useCancelOSProps) =>
      serviceOrdersService.cancelServiceOrder(payload, id),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchOSById");
        showNotification({
          title: "Sucesso",
          message: "Ordem de serviço cancelada com sucesso.",
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
