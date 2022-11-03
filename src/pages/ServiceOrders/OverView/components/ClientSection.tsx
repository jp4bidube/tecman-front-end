import { ServiceOrders } from "@/types/serviceOrders";
import { Card, Group, Text, Title } from "@mantine/core";

type ClientSectionProps = {
  data: ServiceOrders;
};
export const ClientSection = ({ data }: ClientSectionProps) => {
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
        <Title order={4}>Cliente</Title>
      </Card.Section>
      <Group mt={10} position="apart">
        <Group spacing="xs">
          <Text size="sm" component="label" weight={500}>
            Nome:
          </Text>
          <Text size="sm">{data?.client?.name}</Text>
        </Group>
      </Group>
      <Group mt={5} noWrap spacing="xs">
        <Text size="sm" component="label" weight={500}>
          CPF:
        </Text>
        <Text size="sm">{data?.client.cpf}</Text>
      </Group>
      <Group mt={15} spacing="xs">
        <Text size="sm" component="label" weight={500}>
          Endereço:
        </Text>
        <Text size="sm">
          {data?.street}, {data?.number}
        </Text>
      </Group>
      <Group mt={5}>
        <Text size="sm" component="label" weight={500}>
          CEP:
        </Text>
        <Text size="sm">{data?.cep}</Text>
      </Group>
    </Card>
  );
};
