import { ResponseError } from "@/types/responseError";
import { CreateUserPayload } from "@/types/user";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../users";

export const useCreateTechnicians = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (user: CreateUserPayload) => usersService.postCreateUser(user),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchTechnicians");
        await queryClient.refetchQueries();
        showNotification({
          title: "Sucesso",
          message: "Técnico criado com sucesso",
          color: "teal",
          autoClose: true,
        });
        navigate("/technicians");
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
