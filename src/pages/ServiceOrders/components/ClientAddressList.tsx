import { ClientAddress } from "@/types/clients";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Chip,
  Group,
  List,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import PerfectScrollbar from "react-perfect-scrollbar";

type ClientAddressListProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
  onChange: (value: string) => void;
  adresses: Array<ClientAddress> | undefined;
};
type AdreessItemProps = {
  data: ClientAddress;
  onSelect: (value: string) => void;
  selected: string;
};

const AdreessItem = ({ data, onSelect, selected }: AdreessItemProps) => {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="xs"
      py="xs"
      px="xl"
      radius="lg"
      sx={{
        minHeight: 100,
        cursor: "pointer",
        flexWrap: "nowrap",
        borderColor:
          selected === data.id
            ? theme.colorScheme === "dark"
              ? theme.colors.tecman[3]
              : theme.colors.tecman[6]
            : "default",
        backgroundColor:
          selected === data.id
            ? theme.colorScheme === "dark"
              ? "rgba(28, 46, 74, 0.2)"
              : "rgba(236, 241, 248, 1);"
            : "default",
        ":hover": {
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.tecman[3]
              : theme.colors.tecman[6],
        },
      }}
      onClick={() => onSelect(data.id)}
      withBorder
    >
      <Group mt="sm" grow>
        <Text weight={500}>CEP</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          {data.address.cep}
        </Text>
      </Group>
      <Group mt="sm" grow>
        <Text weight={500}>Rua</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          {data.address.street}
        </Text>
      </Group>
      <Group mt="sm" grow>
        <Text weight={500}>Número</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          {data.address.number}
        </Text>
      </Group>
      <Group mt="sm" grow>
        <Text weight={500}>Bairro</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          {data.address.district}
        </Text>
      </Group>
      <Group mt="sm" grow>
        <Text weight={500}>Complemento</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          {data.address.complement}
        </Text>
      </Group>
    </Paper>
  );
};

export const ClientAddressList = ({
  opened,
  setOpened,
  adresses,
  onChange,
}: ClientAddressListProps) => {
  const theme = useMantineTheme();
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectItem = (id: string) => setSelectedItem(id);

  const handleChange = () => {
    setOpened(false);
    onChange(selectedItem);
  };

  return (
    <Modal
      opened={opened}
      withCloseButton
      onClose={() => setOpened(false)}
      size="lg"
      radius="md"
      centered
      title={<Title order={3}>Alterar endereço padrão</Title>}
    >
      <ScrollArea style={{ height: "30rem" }}>
        <List spacing="xs" size="sm" center listStyleType="none">
          {adresses?.length! > 0 &&
            adresses!.map((address) => (
              <List.Item key={address.id}>
                <AdreessItem
                  data={address}
                  onSelect={handleSelectItem}
                  selected={selectedItem}
                />
              </List.Item>
            ))}
          <List.Item>
            <Paper
              shadow="xs"
              py="xs"
              px="xl"
              radius="lg"
              sx={{
                minHeight: 90,
                cursor: "pointer",
                flexWrap: "nowrap",
                borderColor:
                  selectedItem === "other"
                    ? theme.colorScheme === "dark"
                      ? theme.colors.tecman[3]
                      : theme.colors.tecman[6]
                    : "default",
                backgroundColor:
                  selectedItem === "other"
                    ? theme.colorScheme === "dark"
                      ? "rgba(28, 46, 74, 0.2)"
                      : "rgba(236, 241, 248, 1);"
                    : "default",
                ":hover": {
                  borderColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.tecman[3]
                      : theme.colors.tecman[6],
                },
              }}
              onClick={() => setSelectedItem("other")}
              withBorder
            >
              <Center>
                <Stack align="center" mt={15}>
                  <Title order={5}>Usar outro endereço</Title>
                  <Text size="xs">
                    Liberar campos para cadastrar outro endereço.
                  </Text>
                </Stack>
              </Center>
            </Paper>
          </List.Item>
        </List>
      </ScrollArea>

      <Group align="flex-end" mt={20}>
        <Button radius="xl" onClick={handleChange}>
          Alterar Endereço
        </Button>
      </Group>
    </Modal>
  );
};
