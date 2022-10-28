import { ResponseError } from "@/types/responseError";
import { EditUserPayload } from "@/types/user";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../users";

type useUpdateProps = {
  payload: EditUserPayload;
  id: number;
};

export const useUpdateTechnicians = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ id, payload }: useUpdateProps) =>
      usersService.putUpdateEmployee(id, payload),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("fetchTechnicians");
        showNotification({
          title: "Sucesso",
          message: "Técnico atualizado com sucesso",
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
