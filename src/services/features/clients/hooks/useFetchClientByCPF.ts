import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { clientsService } from "..";

export const useFetchClientByCPF = () => {
  return useMutation(
    async (cpf: string) => clientsService.getClientByCPF(cpf),
    {
      onSuccess: async (res) => {
        return res;
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
