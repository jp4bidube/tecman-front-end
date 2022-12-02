import { ResponseError } from "@/types/responseError";
import { ServiceOrdersCreate } from "@/types/serviceOrders";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { serviceOrdersService } from "..";

export const useCreateOS = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation(
    async (payload: ServiceOrdersCreate) =>
      serviceOrdersService.createServiceOrder(payload),
    {
      onSuccess: async () => {
        showNotification({
          title: "Sucesso",
          message: "Ordem de serviço criada com sucesso.",
          color: "teal",
          autoClose: true,
        });

        if (location.pathname.includes("clients")) {
          return navigate(-1);
        }

        return navigate("/service-orders");
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
