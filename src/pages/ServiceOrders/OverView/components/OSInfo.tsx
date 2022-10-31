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
        <Title order={4}>Informações da OS</Title>
      </Card.Section>
      <Group mt={10} position="apart">
        <Group>
          <Title order={5}>Técnico</Title>
          <Text size="sm">{data?.tecnic?.name} </Text>
        </Group>
        <Group>
          <Title order={5}>Orçamento</Title>
          <Text size="sm">
            <Badge size="lg" color="teal">
              R$ 120.50
            </Badge>
          </Text>
        </Group>
      </Group>
      <Group mt={5}>
        <Title order={5}>Atendente</Title>
        <Text size="sm">{data?.createdBy}</Text>
      </Group>
      <Group mt={5}>
        <Title order={5}>Data de criação</Title>
        <Text size="sm">
          {new Date(data?.dateCreated || "").toLocaleDateString("pt-BR")}
        </Text>
      </Group>
    </Card>
  );
};
