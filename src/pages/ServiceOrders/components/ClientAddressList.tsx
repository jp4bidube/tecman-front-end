import {
  Box,
  Button,
  Grid,
  Group,
  List,
  Modal,
  Paper,
  Radio,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import PerfectScrollbar from "react-perfect-scrollbar";

type ClientAddressListProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

const AdreessItem = () => {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="xs"
      py="xs"
      px="xl"
      radius="lg"
      sx={{
        minHeight: 150,
        cursor: "pointer",
        flexWrap: "nowrap",
        ":hover": {
          borderWidth: "2px",
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.tecman[3]
              : theme.colors.tecman[6],
        },
      }}
      withBorder
    >
      <Group mt="sm">
        <Text weight={500}>CEP</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          4565464646456546464645654646464565464sssssssscccvvvvvaasas
        </Text>
      </Group>
      <Group mt="sm">
        <Text weight={500}>Rua</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          4565464646
        </Text>
      </Group>
      <Group mt="sm">
        <Text weight={500}>Número</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          4565464646456546464645654646464565464sssssssscccvvvvvaasas
        </Text>
      </Group>
      <Group mt="sm">
        <Text weight={500}>Bairro</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          4565464646456546464645654646464565464sssssssscccvvvvvaasas
        </Text>
      </Group>
      <Group mt="sm">
        <Text weight={500}>Complemento</Text>
        <Text size="sm" color="dimmed" lineClamp={1}>
          4565464646456546464645654646464565464sssssssscccvvvvvaasas
        </Text>
      </Group>
    </Paper>
  );
};

export const ClientAddressList = ({
  opened,
  setOpened,
}: ClientAddressListProps) => {
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
      <Box sx={{ height: "30rem", overflow: "auto" }}>
        <PerfectScrollbar>
          <List spacing="xs" size="sm" center listStyleType="none">
            <List.Item>
              <AdreessItem />
            </List.Item>
            <List.Item>
              <AdreessItem />
            </List.Item>
            <List.Item>
              <AdreessItem />
            </List.Item>
          </List>
        </PerfectScrollbar>
      </Box>

      <Group align="flex-end" mt={20}>
        <Button radius="xl" onClick={() => setOpened(false)}>
          Alterar Endereço
        </Button>
      </Group>
    </Modal>
  );
};
