import { RecouverPasswordUser } from "@/types/auth";
import { ResponseError } from "@/types/responseError";
import { ServiceOrdersCreate } from "@/types/serviceOrders";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { serviceOrdersService } from "..";

type useUpdateProps = {
  payload: {
    username: string;
    password: string;
    employeeId: number;
  };
  id: number;
};

export const useCreateOS = () => {
  const navigate = useNavigate();

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
        navigate("/service-orders");
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
