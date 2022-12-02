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
import { IoBuildOutline } from "react-icons/io5";
import { TbAd2, TbHome, TbUserCircle, TbUsers } from "react-icons/tb";
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
        subhead: [],
      }),
    []
  );

  return (
    <Grid px={match ? 100 : 0} pt={50}>
      <Grid.Col md={6}>
        <Paper
          shadow="xs"
          p="md"
          radius="md"
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
              <Title order={4}>Clientes</Title>
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
          radius="md"
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
          onClick={() => navigate("/service-orders")}
          withBorder
        >
          <Center>
            <Stack align="center" mt={15}>
              <ActionIcon variant="transparent" color="primary" size="xl">
                <TbAd2 size={90} />
              </ActionIcon>
              <Title order={4}>Ordens de Serviço</Title>
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
          radius="md"
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
              <Title order={4}>Usuários</Title>
              <Text size="sm">Gerencie usuários do sistema.</Text>
            </Stack>
          </Center>
        </Paper>
      </Grid.Col>
      <Grid.Col md={6}>
        <Paper
          shadow="xs"
          p="md"
          radius="md"
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
          onClick={() => navigate("/technicians")}
        >
          <Center>
            <Stack align="center" mt={15}>
              <ActionIcon variant="transparent" color="primary" size="xl">
                <IoBuildOutline size={90} />
              </ActionIcon>
              <Title order={4}>Técnicos</Title>
              <Text size="sm">
                Consulte a listagem dos técnicos e inclua novos.
              </Text>
            </Stack>
          </Center>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
