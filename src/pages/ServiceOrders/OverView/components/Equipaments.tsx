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
    data?.length > 0
      ? data[0]
      : ({
          brand: "Brastemp",
          model: "inverter",
          type: "Geladeira",
          mounthsWarranty: 0,
          warrantyPeriod: new Date(),
        } as Equipment);

  return (
    <>
      <Grid.Col xs={12} md={7}>
        <Group position="apart">
          <Group>
            <ThemeIcon size={24} radius="xl" variant="light">
              <TbBox size={16} />
            </ThemeIcon>
            <Text size="sm">{equipment.type}</Text>
            <Divider orientation="vertical" />
            <Text size="sm" component="label">
              {equipment.brand}
            </Text>
            <Divider orientation="vertical" />
            <Text size="sm" component="label">
              {equipment.model}
            </Text>
          </Group>
          {equipment.warrantyPeriod && (
            <Group>
              <Text size="sm">Garantia</Text>
              <Badge>
                {equipment.mounthsWarranty && equipment?.mounthsWarranty > 1
                  ? `${equipment.mounthsWarranty} Meses`
                  : `${equipment.mounthsWarranty} Mês`}
              </Badge>
            </Group>
          )}
        </Group>
      </Grid.Col>
      <Grid.Col xs={12} md={5}></Grid.Col>
    </>
  );
};
