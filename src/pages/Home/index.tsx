import useStore from "@/store";
import {
  ActionIcon,
  Center,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import {
  TbAd2,
  TbFileText,
  TbHome,
  TbUserCircle,
  TbUsers,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const theme = useMantineTheme();
  const store = useStore();
  const navigate = useNavigate();
  const match = useMediaQuery("(min-width: 1200px)");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Home",
        path: "/",
        icon: <TbHome size={25} />,
      }),
    []
  );

  return (
    <Grid px={match ? 100 : 0} pt={50}>
      <Grid.Col md={6}>
        <Paper
          shadow="xs"
          p="md"
          radius="lg"
          sx={{
            minHeight: 250,
            cursor: "pointer",
            ":hover": {
              borderColor:
                theme.colorScheme === "dark"
                  ? theme.colors.tecman[3]
                  : theme.colors.tecman[6],
            },
          }}
          onClick={() => navigate("/clients")}
          withBorder
        >
          <Center>
            <Stack align="center" mt={15}>
              <ActionIcon variant="transparent" color="primary" size="xl">
                <TbUsers size={90} />
              </ActionIcon>
              <Title order={3}>Clientes</Title>
              <Text size="sm">
                Gerencie clientes cadastrados e inclua novos.
              </Text>
            </Stack>
          </Center>
        </Paper>
      </Grid.Col>
      <Grid.Col md={6}>
        <Paper
          shadow="xs"
          p="md"
          radius="lg"
          sx={{
            minHeight: 250,
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
          <Center>
            <Stack align="center" mt={15}>
              <ActionIcon variant="transparent" color="primary" size="xl">
                <TbAd2 size={90} />
              </ActionIcon>
              <Title order={3}>Ordens de Serviço</Title>
              <Text size="sm" align="center">
                Crie, consulte e administre ordens de serviços listadas por
                clientes e/ou técnicos.
              </Text>
            </Stack>
          </Center>
        </Paper>
      </Grid.Col>
      <Grid.Col md={6}>
        <Paper
          shadow="xs"
          p="md"
          radius="lg"
          sx={{
            minHeight: 250,
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
          <Center>
            <Stack align="center" mt={15}>
              <ActionIcon variant="transparent" color="primary" size="xl">
                <TbFileText size={90} />
              </ActionIcon>
              <Title order={3}>Garantias</Title>
              <Text size="sm">
                Cadastre garantias para os serviços realizados.
              </Text>
            </Stack>
          </Center>
        </Paper>
      </Grid.Col>
      <Grid.Col md={6}>
        <Paper
          shadow="xs"
          p="md"
          radius="lg"
          sx={{
            minHeight: 250,
            cursor: "pointer",
            ":hover": {
              borderColor:
                theme.colorScheme === "dark"
                  ? theme.colors.tecman[3]
                  : theme.colors.tecman[6],
            },
          }}
          onClick={() => navigate("/users")}
          withBorder
        >
          <Center>
            <Stack align="center" mt={15}>
              <ActionIcon variant="transparent" color="primary" size="xl">
                <TbUserCircle size={90} />
              </ActionIcon>
              <Title order={3}>Funcionários</Title>
              <Text size="sm">
                Gerencie funcionários cadastrados e inclua novos.
              </Text>
            </Stack>
          </Center>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
