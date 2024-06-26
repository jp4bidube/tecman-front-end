import { usePermission } from "@/hooks/usePermission";
import useStore from "@/store";
import { Button, Group, Stack, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { IoBuildOutline } from "react-icons/io5";
import { TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { TechniciansList } from "./List";

export const Technicians: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  const hasPermission = usePermission();
  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Técnicos",
        path: "/technicians",
        icon: <IoBuildOutline size={25} />,
        subhead: [],
      }),
    []
  );

  return (
    <Stack>
      <Group position="right">
        <Tooltip
          label={
            !hasPermission
              ? "Usuário não tem permissão para executar esta ação"
              : "Adicionar Técnico"
          }
          withArrow
        >
          <span>
            <Button
              radius="xl"
              leftIcon={<TbPlus size={20} />}
              onClick={() => navigate("/technicians/create")}
              disabled={!hasPermission}
            >
              Cadastrar
            </Button>
          </span>
        </Tooltip>
      </Group>
      <TechniciansList />
    </Stack>
  );
};
