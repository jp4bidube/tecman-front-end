import { useEffect } from "react";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";
import { TbAlertOctagon, TbAlertTriangle } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function NotFound() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const store = useStore();
  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Página não encontrada",
        path: "/",
        icon: <TbAlertOctagon size={25} />,
      }),
    []
  );

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Nada para ver aqui</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        A página que você está tentando abrir não existe. Você pode ter digitado
        incorretamente o endereço ou a página foi movida para outro URL.
      </Text>
      <Group position="center">
        <Button variant="light" size="md" onClick={() => navigate("/")}>
          Leve-me de volta à página inicial
        </Button>
      </Group>
    </Container>
  );
}
