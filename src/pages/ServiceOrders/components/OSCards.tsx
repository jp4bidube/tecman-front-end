import useStore from "@/store";
import { ServiceOrders } from "@/types/serviceOrders";
import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { useEffect } from "react";
import { TbChevronDown, TbChevronUp, TbEdit, TbUserOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { OSCardSkeleton } from "../List/OSCardSkeleton";

type UsersCardsProps = {
  serviceOrders: ServiceOrders[] | undefined;
  isFetching: boolean;
};

export const OSCards = ({ serviceOrders, isFetching }: UsersCardsProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.usersFilter;

  useEffect(() => {
    store.setServiceOrdersFilter({
      ...store.serviceOrdersFilter,
      sort: "name",
      order: "asc",
    });
  }, []);

  return (
    <>
      {isFetching ? (
        <OSCardSkeleton />
      ) : (
        serviceOrders &&
        serviceOrders.map((os) => (
          <Card shadow="sm" p="lg" radius="md" withBorder mb="lg" key={os.id}>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Situação</Text>
              <Badge color={os.orderServiceStatus.id === 1 ? "orange" : "teal"}>
                {os.orderServiceStatus.status}
              </Badge>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Group sx={{ cursor: "pointer" }}>
                <Text weight={500}> Número OS</Text>
              </Group>
              <Text size="sm" color="dimmed">
                {os.id}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Endereço</Text>
              <Text size="sm" color="dimmed">
                {os.street}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Data de criação</Text>
              <Text size="sm" color="dimmed">
                {new Date(os.dateCreated).toLocaleDateString("pt-BR")}
              </Text>
            </Group>
            <Card.Section withBorder inheritPadding py="xs">
              <Group>
                <Tooltip label="Editar" withArrow>
                  <Button
                    variant="light"
                    onClick={() =>
                      navigate(`/service-orders/${os.id}/over-view`)
                    }
                    leftIcon={<TbEdit />}
                  >
                    <Text>Editar</Text>
                  </Button>
                </Tooltip>
              </Group>
            </Card.Section>
          </Card>
        ))
      )}
    </>
  );
};
