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

const AdreessItem = ({ id }: { id: string }) => {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="xs"
      p="md"
      radius="lg"
      sx={{
        minHeight: 150,
        cursor: "pointer",
        ":hover": {
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.tecman[3]
              : theme.colors.tecman[6],
        },
      }}
      withBorder
    >
      <Grid justify="center" align="center">
        <Grid.Col span={2}>
          <Box mt="20%">
            <Radio value={id} />
          </Box>
        </Grid.Col>
        <Grid.Col span={10}>
          <Group position="apart" mt="sm" grow>
            <Text weight={500}>CEP</Text>
            <Text size="sm" color="dimmed" lineClamp={1}>
              4565464646
            </Text>
          </Group>
          <Group position="apart" mt="sm" grow>
            <Text weight={500}>Rua</Text>
            <Text size="sm" color="dimmed" lineClamp={1}>
              4565464646
            </Text>
          </Group>
          <Group position="apart" mt="sm" grow>
            <Text weight={500}>Número</Text>
            <Text size="sm" color="dimmed" lineClamp={1}>
              4565464646
            </Text>
          </Group>
          <Group position="apart" mt="sm" grow>
            <Text weight={500}>Número</Text>
            <Text size="sm" color="dimmed" lineClamp={1}>
              4565464646
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
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
          <Radio.Group orientation="vertical">
            <List spacing="xs" size="sm" center listStyleType="none">
              <List.Item>
                <AdreessItem id="1" />
              </List.Item>
              <List.Item>
                <AdreessItem id="2" />
              </List.Item>
              <List.Item>
                <AdreessItem id="3" />
              </List.Item>
            </List>
          </Radio.Group>
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
