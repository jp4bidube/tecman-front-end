import { ServiceOrders } from "@/types/serviceOrders";
import { Badge, Card, Group, Text, Title } from "@mantine/core";

type OSInfoProps = {
  data: ServiceOrders;
};

export const OSInfo = ({ data }: OSInfoProps) => {
  return (
    <Card withBorder p="lg" radius="md">
      <Card.Section
        px="lg"
        py="xs"
        withBorder
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.gray[8]
              : theme.colors.gray[0],
        })}
      >
        <Title order={4}>Informações OS</Title>
      </Card.Section>
      <Group mt={10} position="apart">
        <Group>
          <Text size="sm" color="gray.7">
            Data de criação:{" "}
            {new Date(data?.dateCreated || "").toLocaleDateString("pt-BR")}
          </Text>
        </Group>
        {data?.orderServiceStatus.id === 2 && (
          <Group>
            <Text size="sm" color="gray.7">
              Orçamento:
            </Text>
            <Badge size="md" color="orange">
              {`R$ ${data.budget}`}
            </Badge>
          </Group>
        )}
      </Group>
      <Group mt={5} position="apart">
        <Group>
          <Text size="sm" color="gray.7">
            Atendente: {data?.createdBy}
          </Text>
        </Group>
        {data?.orderServiceStatus.id === 2 && (
          <Group>
            <Text size="sm" color="gray.7">
              Valor Recebido:
            </Text>
            <Badge size="md" color="teal">
              {`R$ ${data.amountReceived}`}
            </Badge>
          </Group>
        )}
      </Group>
      <Group mt={15}>
        <Text size="sm" color="gray.7">
          Técnico: {data?.tecnic?.name}
        </Text>
      </Group>
      <Group mt={25}></Group>
    </Card>
  );
};
