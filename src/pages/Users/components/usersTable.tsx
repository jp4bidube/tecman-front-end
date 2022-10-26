import { Th } from "@/components/Th";
import useStore from "@/store";
import { User } from "@/types/user";
import { Badge, Group, Table, ThemeIcon, Title, Tooltip } from "@mantine/core";

import {
  TbChevronDown,
  TbChevronUp,
  TbEdit,
  TbSelector,
  TbUser,
  TbUserOff,
} from "react-icons/tb";
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
            Nome
          </Th>
          <Th onSort={handleSort} columnName="email" sort={sort} order={order}>
            E-mail
          </Th>

          <Th onSort={handleSort} columnName="role" sort={sort} order={order}>
            Perfil
          </Th>
          <Th onSort={handleSort} columnName="cpf" sort={sort} order={order}>
            Documento
          </Th>
          <Th onSort={handleSort} columnName="status" sort={sort} order={order}>
            Status
          </Th>
          <th style={{ width: "6rem" }}>Açoes</th>
        </tr>
      </thead>
      <tbody>
        {isFetching ? (
          <UsersTableSkeleton />
        ) : (
          users &&
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge color="tecman">{user.role.role}</Badge>
              </td>
              <td>{user.cpf}</td>
              <td>
                <Badge
                  color={
                    user.employeeStatus.status === "Ativo" ? "teal" : "red"
                  }
                >
                  {user.employeeStatus.status}
                </Badge>
              </td>
              <td>
                <Group>
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
                </Group>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
