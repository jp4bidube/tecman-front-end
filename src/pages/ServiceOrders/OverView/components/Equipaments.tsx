import { Equipment } from "@/types/serviceOrders";
import {
  Badge,
  Box,
  Chip,
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
  return (
    <List size="sm" center listStyleType="none">
      {data &&
        data.map((equip) => (
          <List.Item
            key={equip.id}
            sx={(theme) => ({
              borderBottom: `0.5px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2]
              }`,
              padding: ".8rem",
              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Group position="apart">
              <Group>
                <ThemeIcon size={24} radius="xl" variant="light">
                  <TbBox size={16} />
                </ThemeIcon>
                <Title order={5}>{equip.type} -</Title>
                <Text>{equip.brand}</Text>
                <Text>{equip.model}</Text>
              </Group>
              {equip.warrantyPeriod && (
                <Group>
                  <Title order={6}>Garantia</Title>
                  <Badge>
                    {equip.mounthsWarranty > 1
                      ? `${equip.mounthsWarranty} Meses`
                      : `${equip.mounthsWarranty} Mês`}
                  </Badge>
                </Group>
              )}
            </Group>
          </List.Item>
        ))}
    </List>
  );
};
