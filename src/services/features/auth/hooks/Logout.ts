import { authService } from "@/services/features/auth";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation(async () => authService.logout(), {
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      navigate("/login");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      showNotification({
        title: "Erro",
        message: "Erro ao deslogar",
        color: "red",
        autoClose: true,
      });
    },
  });
};
