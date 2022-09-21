import useStore from "@/store";
import { Button, Group, Stack, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { TbPlus, TbUsers } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ClientsList } from "./List";

export const Clients: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Clientes",
        path: "/clients",
        icon: <TbUsers size={25} />,
      }),
    []
  );

  return (
    <Stack>
      <Group position="right">
        <Tooltip label="Adicionar Cliente" withArrow>
          <Button
            radius="xl"
            leftIcon={<TbPlus size={20} />}
            onClick={() => navigate("/clients/create")}
          >
            Cadastrar
          </Button>
        </Tooltip>
      </Group>
      <ClientsList />
    </Stack>
  );
};
