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
        <Group>
          <Text size="sm" color="gray.7">
            Nome: {data?.client?.name}
          </Text>
        </Group>
      </Group>
      <Group mt={5} noWrap>
        <Text size="sm" color="gray.7">
          CPF: {data?.client.cpf}
        </Text>
      </Group>
      <Group mt={15}>
        <Text size="sm" color="gray.7">
          Endereço: {data?.street}, {data?.number}
        </Text>
      </Group>
      <Group mt={5}>
        <Text size="sm" color="gray.7">
          CEP: {data?.cep}
        </Text>
      </Group>
    </Card>
  );
};
