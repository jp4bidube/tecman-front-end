import { ClientAddress } from "@/types/clients";
import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  Group,
  List,
  Modal,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useState } from "react";

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

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "background-color 150ms ease, border-color 150ms ease",
    border: `1px solid ${
      checked
        ? theme.fn.variant({ variant: "outline", color: theme.primaryColor })
            .border
        : theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .background
      : theme.colorScheme === "dark"
      ? theme.colors.dark[8]
      : theme.white,
  },
}));

const AdreessItem = ({ data, onSelect, selected }: AdreessItemProps) => {
  const { classes, cx } = useStyles({
    checked: selected === data.id ? true : false,
  });
  return (
    <UnstyledButton
      onClick={() => onSelect(data.id)}
      className={cx(classes.button)}
    >
      <Checkbox
        checked={selected === data.id ? true : false}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: "pointer" } }}
      />

      <div>
        <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
          {data.address.street}, {data.address.number}
        </Text>
        <Text size="sm" color="dimmed">
          {data.address.cep} - {data.address.district},{" "}
          {data.address.complement}
        </Text>
      </div>
    </UnstyledButton>
  );
};

export const ClientAddressList = ({
  opened,
  setOpened,
  adresses,
  onChange,
}: ClientAddressListProps) => {
  const [selectedItem, setSelectedItem] = useState("");
  const { classes, cx } = useStyles({
    checked: selectedItem === "other" ? true : false,
  });

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
      <ScrollArea style={{ height: "30rem", padding: "0 2rem" }}>
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
            <UnstyledButton
              onClick={() => setSelectedItem("other")}
              className={cx(classes.button)}
            >
              <Checkbox
                checked={selectedItem === "other" ? true : false}
                onChange={() => {}}
                tabIndex={-1}
                size="md"
                mr="xl"
                styles={{ input: { cursor: "pointer" } }}
              />

              <div>
                <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
                  Usar outro endereço
                </Text>
                <Text size="sm" color="dimmed">
                  Liberar campos para cadastrar outro endereço.
                </Text>
              </div>
            </UnstyledButton>
            {/* <Paper
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
            </Paper> */}
          </List.Item>
        </List>
      </ScrollArea>
      <Divider />
      <Group align="flex-end" mt={20}>
        <Button radius="xl" onClick={handleChange}>
          Alterar Endereço
        </Button>
      </Group>
    </Modal>
  );
};
