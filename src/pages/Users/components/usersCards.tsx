import useStore from "@/store";
import { User } from "@/types/user";
import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { useEffect } from "react";
import { TbChevronDown, TbChevronUp, TbEdit, TbUserOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type UsersCardsProps = {
  users: User[] | undefined;
  confirmInactivation: (id: number, user: User) => void;
};

export const UsersCards = ({ users, confirmInactivation }: UsersCardsProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.usersFilter;

  useEffect(() => {
    store.setUsersFilter({
      ...store.usersFilter,
      sort: "name",
      order: "asc",
    });
  }, []);

  return (
    <>
      {users &&
        users.map((user) => (
          <Card shadow="sm" p="lg" radius="md" withBorder mb="lg" key={user.id}>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Situação</Text>
              <Badge color="teal" variant="light">
                Ativo
              </Badge>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Group sx={{ cursor: "pointer" }}>
                <Text weight={500}>Nome</Text>
                <Tooltip label="Ordenado por nome" withArrow>
                  <ThemeIcon variant="light">
                    {sort === "name" && order === "asc" ? (
                      <TbChevronUp size={15} />
                    ) : (
                      <TbChevronDown size={15} />
                    )}
                  </ThemeIcon>
                </Tooltip>
              </Group>
              <Text size="sm" color="dimmed">
                {user.name}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>E-mail</Text>
              <Text size="sm" color="dimmed">
                {user.email}
              </Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Documento</Text>
              <Text size="sm" color="dimmed">
                {user.cpf}
              </Text>
            </Group>
            <Card.Section withBorder inheritPadding py="xs">
              <Group>
                <Tooltip label="Editar" withArrow>
                  <Button
                    variant="light"
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                    leftIcon={<TbEdit />}
                  >
                    <Text>Editar</Text>
                  </Button>
                </Tooltip>
                <Tooltip label="Desativar usuário" withArrow>
                  <Button
                    color="red"
                    variant="light"
                    onClick={() => confirmInactivation(user.id, user)}
                    leftIcon={<TbUserOff />}
                  >
                    <Text>Desativar</Text>
                  </Button>
                </Tooltip>
              </Group>
            </Card.Section>
          </Card>
        ))}
    </>
  );
};
