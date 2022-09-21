import useStore from "@/store";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "react-query";
import { usersService } from "..";

export const useMe = () => {
  const store = useStore();

  return useQuery(["me"], async () => usersService.getCurrentUser(), {
    onSuccess: async (res) => {
      store.setLoggedUser(res);
    },
    onError: (err) => {
      showNotification({
        title: "Erro",
        message: "erro",
        color: "red",
        autoClose: true,
      });
    },
  });
};
