import { Equipment } from "@/types/serviceOrders";
import { Group, List, Text, ThemeIcon, Title } from "@mantine/core";
import { TbBox } from "react-icons/tb";

type EquipmentsProps = {
  data: Equipment[];
};

export const Equipaments = ({ data }: EquipmentsProps) => {
  return (
    <List
      size="sm"
      center
      icon={
        <ThemeIcon size={24} radius="xl" variant="light">
          <TbBox size={16} />
        </ThemeIcon>
      }
      withPadding
    >
      {data &&
        data.map((equip) => (
          <List.Item
            key={equip.id}
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.colors.red}`,
              padding: ".8rem",
              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <Title order={5}>{equip.type}</Title>
              <Text>{equip.brand}</Text>
              <Text>{equip.model}</Text>
            </Group>
          </List.Item>
        ))}
    </List>
  );
};
