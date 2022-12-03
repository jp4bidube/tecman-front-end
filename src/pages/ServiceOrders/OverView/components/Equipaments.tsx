import { Equipment } from "@/types/serviceOrders";
import {
  Badge,
  Box,
  Chip,
  Divider,
  Grid,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { TbBox } from "react-icons/tb";

type EquipmentsProps = {
  data: Equipment[];
};

export const Equipaments = ({ data }: EquipmentsProps) => {
  const equipment =
    data && data?.length > 0
      ? data[0]
      : ({
          brand: "",
          model: "",
          type: "",
          mounthsWarranty: 0,
          warrantyPeriod: null,
        } as Equipment);

  return (
    <>
      <Grid.Col xs={12} md={7}>
        <Group position="apart">
          <Group>
            <ThemeIcon size={24} radius="xl" variant="light">
              <TbBox size={16} />
            </ThemeIcon>
            <Text size="sm">{equipment?.type}</Text>
            <Divider orientation="vertical" />
            <Text size="sm" component="label">
              {equipment?.brand}
            </Text>
            <Divider orientation="vertical" />
            <Text size="sm" component="label">
              {equipment?.model}
            </Text>
          </Group>
          <Group>
            <Text size="sm">Garantia</Text>
            <Badge color={equipment?.mounthsWarranty ? "tecman" : "orange"}>
              {equipment?.mounthsWarranty ? (
                equipment?.mounthsWarranty > 1 ? (
                  `${equipment?.mounthsWarranty} Meses`
                ) : (
                  `${equipment?.mounthsWarranty} Mês`
                )
              ) : (
                <Text size="xs">sem garantia</Text>
              )}
            </Badge>
          </Group>
          {equipment?.warrantyPeriod && (
            <Group>
              <Text size="sm">Término:</Text>
              <Text size="sm" component="label">
                {equipment?.warrantyPeriod &&
                  new Date(equipment?.warrantyPeriod!).toLocaleDateString(
                    "pt-BR"
                  )}
              </Text>
            </Group>
          )}
        </Group>
      </Grid.Col>
      <Grid.Col xs={12} md={5}></Grid.Col>
    </>
  );
};
