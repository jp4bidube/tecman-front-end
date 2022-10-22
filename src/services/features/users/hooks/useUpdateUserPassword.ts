import { RecouverPasswordUser } from "@/types/auth";
import { ResponseError } from "@/types/responseError";
import { showNotification } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { usersService } from "..";

type useUpdateProps = {
  payload: {
    username: string;
    password: string;
    employeeId: number;
  };
  id: number;
};

export const useUpdateUserPassword = () => {
  const navigate = useNavigate();

  return useMutation(
    async ({ id, payload }: useUpdateProps) =>
      usersService.putUpdateUser(id, payload),
    {
      onSuccess: async () => {
        showNotification({
          title: "Sucesso",
          message: "Senha atualizada com sucesso",
          color: "teal",
          autoClose: true,
        });
        navigate("/login");
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
