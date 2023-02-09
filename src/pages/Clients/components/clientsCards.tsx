import useStore from "@/store";
import { ClientList } from "@/types/clients";
import { Button, Card, Group, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { TbChevronDown, TbChevronUp, TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type ClientsCardsProps = {
  clients: ClientList[] | undefined;
};

export const ClientsCards = ({ clients }: ClientsCardsProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.clientsFilter;

  useEffect(() => {
    store.setClientsFilter({
      ...store.clientsFilter,
      sort: "name",
      order: "asc",
    });
  }, []);

  return (
    <>
      {clients &&
        clients.map((client) => (
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            mb="lg"
            key={client.id}
          >
            <Group position="apart" mt="md" mb="xs">
              <Group sx={{ cursor: "pointer" }}>
                <Text weight={500} size="sm">
                  Nome
                </Text>
                <Tooltip label="Ordenado por nome" withArrow>
                  <ThemeIcon variant="light">
                    {sort === "name" && order === "asc" ? (
                      <TbChevronUp size={15} />
                    ) : (
                      <TbChevronDown size={15} />
                    )}
                  </ThemeIcon>
                </Tooltip>
              </Group>
              <Text size="sm" color="dimmed">
                {client.name}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500} size="sm">
                Endereço
              </Text>
              <Text size="sm" color="dimmed">
                {client.street}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500} size="sm">
                Documento
              </Text>
              <Text size="sm" color="dimmed">
                {client.cpf}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500} size="sm">
                Telefone
              </Text>
              <Text size="sm" color="dimmed">
                {
                  client.phoneNumber.split(",").filter((phone) => {
                    if (phone !== "" && phone !== undefined) return phone;
                  })[0]
                }
              </Text>
            </Group>
            <Card.Section withBorder inheritPadding py="xs">
              <Group>
                <Tooltip label="Editar" withArrow>
                  <Button
                    variant="light"
                    onClick={() => navigate(`/clients/${client.id}/edit`)}
                    leftIcon={<TbEdit />}
                  >
                    <Text>Editar</Text>
                  </Button>
                </Tooltip>
              </Group>
            </Card.Section>
          </Card>
        ))}
    </>
  );
};
