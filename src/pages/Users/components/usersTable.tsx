import { Th } from "@/components/Th";
import useStore from "@/store";
import { User } from "@/types/user";
import { Badge, Flex, Table, Text, ThemeIcon, Tooltip } from "@mantine/core";

import { TbEdit, TbUser, TbUserOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { UsersTableSkeleton } from "../List/UserTableSkeleton";

type UsersTableProps = {
  users: User[] | undefined;
  confirmInactivation: (id: number, user: User) => void;
  isFetching: boolean;
};

export const UsersTable = ({
  users,
  confirmInactivation,
  isFetching,
}: UsersTableProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.usersFilter;

  const handleSort = (column: string) => {
    store.setUsersFilter({
      ...store.usersFilter,
      sort: column,
      order: order === "desc" ? "asc" : "desc",
    });
  };

  return (
    <Table verticalSpacing="sm" striped>
      <thead>
        <tr>
          <Th onSort={handleSort} columnName="name" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Nome
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="email" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              E-mail
            </Text>
          </Th>

          <Th onSort={handleSort} columnName="role" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Perfil
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="cpf" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Documento
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="status" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Status
            </Text>
          </Th>
          <th style={{ width: "6rem" }}>
            <Text size="xs" tt="capitalize">
              Ações
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {isFetching ? (
          <UsersTableSkeleton />
        ) : (
          users &&
          users.map((user) => (
            <tr key={user.id}>
              <td>
                <Text size="xs" tt="capitalize">
                  {user.name}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="lowercase">
                  {user.email}
                </Text>
              </td>
              <td>
                <Badge color="tecman">
                  <Text size="xs" tt="capitalize">
                    {user.role.role}
                  </Text>
                </Badge>
              </td>
              <td>
                {" "}
                <Text size="xs" tt="capitalize">
                  {user.cpf}
                </Text>
              </td>
              <td>
                <Badge
                  color={
                    user.employeeStatus.status === "Ativo" ? "teal" : "red"
                  }
                >
                  <Text size="xs" tt="capitalize">
                    {user.employeeStatus.status}
                  </Text>
                </Badge>
              </td>
              <td>
                <Flex gap={10}>
                  <Tooltip label="Editar" withArrow>
                    <ThemeIcon
                      variant="light"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/users/${user.id}/edit`)}
                    >
                      <TbEdit />
                    </ThemeIcon>
                  </Tooltip>
                  {user.employeeStatus.status === "Ativo" ? (
                    <Tooltip label="Desativar usuário" withArrow>
                      <ThemeIcon
                        color="red"
                        variant="light"
                        sx={{ cursor: "pointer" }}
                        onClick={() => confirmInactivation(user.id, user)}
                      >
                        <TbUserOff />
                      </ThemeIcon>
                    </Tooltip>
                  ) : (
                    <Tooltip label="Ativar usuário" withArrow>
                      <ThemeIcon
                        color="teal"
                        variant="light"
                        sx={{ cursor: "pointer" }}
                        onClick={() => confirmInactivation(user.id, user)}
                      >
                        <TbUser />
                      </ThemeIcon>
                    </Tooltip>
                  )}
                </Flex>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
