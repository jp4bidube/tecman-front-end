import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { serviceOrdersService } from "..";

export const useMarkASPrintedOS = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => serviceOrdersService.markOSasPrinted(id),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchOSById");
        showNotification({
          title: "Sucesso",
          message: "Ordem de serviço impressa com sucesso.",
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
