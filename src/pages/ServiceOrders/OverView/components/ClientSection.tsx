import { ServiceOrders } from "@/types/serviceOrders";
import { Card, Group, Text, Title } from "@mantine/core";

type ClientSectionProps = {
  data: ServiceOrders;
};
export const ClientSection = ({ data }: ClientSectionProps) => {
  return (
    <Card
      p="md"
      radius="sm"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? "#2C2E33" : "#f1f3f5",
      })}
    >
      <Title order={5}>Cliente</Title>
      <Group mt={10} position="apart">
        <Group spacing="xs">
          <Text size="sm" component="label" weight={500}>
            Nome:
          </Text>
          <Text size="sm">{data?.client?.name}</Text>
        </Group>
      </Group>
      <Group mt={5} noWrap spacing="xs" position="apart">
        <Group>
          <Text size="sm" component="label" weight={500}>
            {data?.client.typePerson === "PF" ? "CPF:" : "CNPJ:"}
          </Text>
          <Text size="sm">{data?.client.cpf}</Text>
        </Group>
        {data?.client.typePerson === "PF" ? (
          <Group>
            <Text size="sm" component="label" weight={500}>
              RG:
            </Text>
            <Text size="sm">{data?.client?.documentIdenfication}</Text>
          </Group>
        ) : (
          <>
            <Group>
              <Text size="sm" component="label" weight={500}>
                IE:
              </Text>
              <Text size="sm">{data?.client?.stateRegistration}</Text>
            </Group>
            <Group>
              <Text size="sm" component="label" weight={500}>
                IM:
              </Text>
              <Text size="sm">{data?.client?.municipalRegistration}</Text>
            </Group>
          </>
        )}
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
