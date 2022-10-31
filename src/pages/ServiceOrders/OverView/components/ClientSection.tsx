import { ServiceOrders } from "@/types/serviceOrders";
import { Box, Card, Group, Text, Title } from "@mantine/core";
import { Section } from "@mantine/core/lib/AppShell/HorizontalSection/Section/Section";

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
          <Title order={5}>Nome</Title>
          <Text size="sm">
            {data?.client?.name}{" "}
            <Text
              sx={(theme) => ({
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[4]
                    : theme.colors.gray[7],
              })}
              component="span"
              weight="bold"
            >
              - {data?.client?.cpf}
            </Text>
          </Text>
        </Group>
      </Group>
      <Group mt={5}>
        <Title order={5}>Endereço</Title>
        <Text size="sm">
          {data?.street} - {data?.number}
        </Text>
      </Group>
      <Group mt={5}>
        <Title order={5}>CEP</Title>
        <Text size="sm">
          {data?.cep} - {data?.complement}
        </Text>
      </Group>
    </Card>
  );
};
