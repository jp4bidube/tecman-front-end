import useStore from "@/store";
import { Button, Group, Stack, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { TbPlus, TbUserCircle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { UsersList } from "./List";

export const Users: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Funcionários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
      }),
    []
  );

  return (
    <Stack>
      <Group position="right">
        <Tooltip label="Adicionar Usuário" withArrow>
          <Button
            radius="xl"
            leftIcon={<TbPlus size={20} />}
            onClick={() => navigate("/users/create")}
          >
            Cadastrar
          </Button>
        </Tooltip>
      </Group>
      <UsersList />
    </Stack>
  );
};
