import { ResponseError } from "@/types/responseError";
import { EditUserPayload } from "@/types/user";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { usersService } from "..";

type useUpdateProps = {
  payload: EditUserPayload;
  id: number;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ id, payload }: useUpdateProps) =>
      usersService.putUpdateUser(id, payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchUsers");
        showNotification({
          title: "Sucesso",
          message: "Funcionario criado com sucesso",
          color: "teal",
          autoClose: true,
        });
        navigate("/users");
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
