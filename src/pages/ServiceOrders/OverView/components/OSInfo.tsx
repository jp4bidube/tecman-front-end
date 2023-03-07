import { ServiceOrders } from "@/types/serviceOrders";
import { converCurrency } from "@/utils/fileToB64";
import { Badge, Card, Group, Text, Title } from "@mantine/core";

type OSInfoProps = {
  data: ServiceOrders;
};

export const OSInfo = ({ data }: OSInfoProps) => {
  return (
    <Card
      p="md"
      radius="sm"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? "#2C2E33" : "#f1f3f5",
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
        <Group>
          {data?.budget !== 0 && (
            <Group spacing="xs">
              <Text size="sm" weight={500} component="label">
                Orçamento:
              </Text>
              <Badge size="md" color="orange">
                {converCurrency(data.budget!)}
              </Badge>
            </Group>
          )}
          {data?.taxVisit !== 0 && (
            <Group spacing="xs">
              <Text size="sm" weight={500} component="label">
                Visita:
              </Text>
              <Badge size="md" color="orange">
                {converCurrency(data.taxVisit!)}
              </Badge>
            </Group>
          )}
        </Group>
      </Group>
      <Group mt={5} position="apart" spacing="xs">
        <Group spacing="xs">
          <Text size="sm" weight={500} component="label">
            Atendente:
          </Text>
          <Text size="sm" lineClamp={1}>
            {data?.createdBy}
          </Text>
        </Group>
        {data?.orderServiceStatus.id === 2 && (
          <Group spacing="xs">
            <Text size="sm" weight={500} component="label">
              Valor Recebido:
            </Text>
            <Badge size="md" color="teal">
              {converCurrency(data.amountReceived!)}
            </Badge>
          </Group>
        )}
      </Group>
      <Group mt={15} spacing="xs" position="apart">
        <Group spacing="xs">
          <Text size="sm" weight={500} component="label">
            Técnico:
          </Text>
          <Text size="sm">{data?.tecnic?.name}</Text>
        </Group>
        <Group spacing="xs">
          <Text size="sm" weight={500} component="label">
            Data do Atendimento:
          </Text>
          <Text size="sm">
            {new Date(data?.scheduledAttendance || "").toLocaleDateString(
              "pt-BR"
            )}
          </Text>
        </Group>
      </Group>

      <Group mt={5} position="apart">
        <Group spacing="xs">
          <Text size="sm" weight={500} component="label">
            Período:
          </Text>
          <Text size="sm">{data?.periodAttendance}</Text>
        </Group>
        {data?.datePayment ? (
          <Group spacing="xs">
            <Group spacing="xs">
              <Text size="sm" weight={500} component="label">
                Data de Pagamento:
              </Text>
              <Text size="sm">
                {new Date(data?.datePayment || "").toLocaleDateString("pt-BR")}
                {data?.paymentMethod && ` - ${data?.paymentMethod}`}
              </Text>
            </Group>
          </Group>
        ) : null}
      </Group>
    </Card>
  );
};
