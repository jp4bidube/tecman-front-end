import useStore from "@/store";
import { Button, Group, Stack, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { TbAd2, TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ServiceOrdersList } from "./List";

export const ServiceOrders: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
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
            onClick={() => navigate("/service-orders/create")}
          >
            Cadastrar
          </Button>
        </Tooltip>
      </Group>
      <ServiceOrdersList />
    </Stack>
  );
};
