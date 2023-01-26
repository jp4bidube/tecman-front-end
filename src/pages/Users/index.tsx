import { usePermission } from "@/hooks/usePermission";
import useStore from "@/store";
import { Button, Group, Stack, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { TbAlertOctagon, TbPlus, TbUserCircle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Forbidden } from "../Forbidden";
import { UsersList } from "./List";

export const Users: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  const hasPermission = usePermission();
  useEffect(() => {
    if (hasPermission) {
      return store.setNewBreadcrumbs({
        name: "Usuários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
        subhead: [],
      });
    }
    return store.setNewBreadcrumbs({
      name: "Acesso negado",
      path: "/",
      icon: <TbAlertOctagon size={25} />,
      subhead: [],
    });
  }, []);

  return (
    <>
      {hasPermission ? (
        <Stack>
          <Group position="right">
            <Tooltip
              label={
                !hasPermission
                  ? "Usuário não tem permissão para executar esta ação"
                  : "Adicionar Usuário"
              }
              withArrow
            >
              <span>
                <Button
                  radius="xl"
                  leftIcon={<TbPlus size={20} />}
                  onClick={() => navigate("/users/create")}
                  disabled={!hasPermission}
                >
                  Cadastrar
                </Button>
              </span>
            </Tooltip>
          </Group>
          <UsersList />
        </Stack>
      ) : (
        <Forbidden />
      )}
    </>
  );
};
