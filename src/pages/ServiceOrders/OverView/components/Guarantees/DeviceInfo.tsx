import { ServiceOrders } from "@/types/serviceOrders";
import { Box, Button, Card, Group, Text, Title } from "@mantine/core";
import { useRef } from "react";
import { TbPrinter } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";
import { GaranteeReport } from "../GaranteeReport";
type OSInfoProps = {
  data: ServiceOrders;
};

export const DeviceInfo = ({ data }: OSInfoProps) => {
  const componentGRef = useRef<HTMLDivElement>(null);

  const handlePrintGarantee = useReactToPrint({
    content: () => componentGRef.current,
  });
  return (
    <>
      <Group position="apart" mb={10}>
        <Title order={5}>Informações da Garantia</Title>
        <Button
          leftIcon={<TbPrinter size={20} />}
          radius="xl"
          onClick={handlePrintGarantee}
        >
          Imprimir Garantia
        </Button>
      </Group>

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
      <Box sx={{ display: "none" }}>
        <GaranteeReport data={data} componentRef={componentGRef} />
      </Box>
    </>
  );
};
