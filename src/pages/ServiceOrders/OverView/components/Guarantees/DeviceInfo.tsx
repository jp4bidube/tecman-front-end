import { ServiceOrders } from "@/types/serviceOrders";
import { Card, Group, Text, Title } from "@mantine/core";

type OSInfoProps = {
  data: ServiceOrders;
};

export const DeviceInfo = ({ data }: OSInfoProps) => {
  return (
    <>
      <Title order={5} mb={10}>
        Informações da Garantia
      </Title>
      <Card
        p="md"
        radius="sm"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? "#2C2E33" : "#f1f3f5",
        })}
      >
        <Group spacing="xs" mt={10}>
          <Text size="sm" weight={500} component="label">
            Equipamento:
          </Text>
          <Text size="sm">
            {data.equipments[0].type} | {data.equipments[0].brand} |{" "}
            {data.equipments[0].model}
          </Text>
        </Group>

        <Group mt={5} position="apart">
          <Group spacing="xs">
            <Text size="sm" weight={500} component="label">
              Garantia:
            </Text>
            <Group>
              <Text size="sm">
                {data.equipments[0].mounthsWarranty &&
                data.equipments[0]?.mounthsWarranty > 1
                  ? `${data.equipments[0].mounthsWarranty} Meses`
                  : `${data.equipments[0].mounthsWarranty} Mês`}
              </Text>
            </Group>
          </Group>
          {data?.orderServiceStatus.id === 2 && (
            <Group spacing="xs">
              <Text size="sm" weight={500} component="label">
                Término da Garantia:
              </Text>
              <Text size="sm">
                {new Date(
                  data?.equipments[0].warrantyPeriod || ""
                ).toLocaleDateString("pt-BR")}
              </Text>
            </Group>
          )}
        </Group>
      </Card>
    </>
  );
};
