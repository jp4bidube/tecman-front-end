import { ServiceOrders } from "@/types/serviceOrders";
import { Badge, Card, Group, Text, Title } from "@mantine/core";

type OSInfoProps = {
  data: ServiceOrders;
};

export const OSInfo = ({ data }: OSInfoProps) => {
  return (
    <Card
      withBorder
      p="md"
      radius="sm"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.gray[8]
            : theme.colors.gray[0],
      })}
    >
      <Title order={5}>Informações OS</Title>
      <Group mt={10} position="apart">
        <Group spacing="xs">
          <Text size="sm" weight={500} component="label">
            Data de criação:
          </Text>
          <Text size="sm">
            {" "}
            {new Date(data?.dateCreated || "").toLocaleDateString("pt-BR")}
          </Text>
        </Group>
        {data?.orderServiceStatus.id === 2 && (
          <Group spacing="xs">
            <Text size="sm" weight={500} component="label">
              Orçamento:
            </Text>
            <Badge size="md" color="orange">
              {`R$ ${data.budget}`}
            </Badge>
          </Group>
        )}
      </Group>
      <Group mt={5} position="apart">
        <Group spacing="xs">
          <Text size="sm" weight={500} component="label">
            Atendente:
          </Text>
          <Text size="sm">{data?.createdBy}</Text>
        </Group>
        {data?.orderServiceStatus.id === 2 && (
          <Group spacing="xs">
            <Text size="sm" weight={500} component="label">
              Valor Recebido:
            </Text>
            <Badge size="md" color="teal">
              {`R$ ${data.amountReceived}`}
            </Badge>
          </Group>
        )}
      </Group>
      <Group mt={15} spacing="xs">
        <Text size="sm" weight={500} component="label">
          Técnico:
        </Text>
        <Text size="sm">{data?.tecnic?.name}</Text>
      </Group>
      <Group mt={5}>
        <Text size="sm" weight={500} component="label">
          Período:
        </Text>
        <Text size="sm">Tarde</Text>
      </Group>
    </Card>
  );
};
