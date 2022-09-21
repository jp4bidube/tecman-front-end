import useStore from "@/store";
import { User } from "@/types/user";
import { Badge, Group, Table, ThemeIcon, Tooltip } from "@mantine/core";

import {
  TbChevronDown,
  TbChevronUp,
  TbEdit,
  TbUser,
  TbUserOff,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type UsersTableProps = {
  users: User[] | undefined;
  confirmInactivation: (id: number, user: User) => void;
};

export const UsersTable = ({ users, confirmInactivation }: UsersTableProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.usersFilter;

  const handleSort = (column: string) => {
    store.setFilter({
      ...store.usersFilter,
      sort: column,
      order: order === "desc" ? "asc" : "desc",
    });
  };

  return (
    <Table verticalSpacing="sm" striped>
      <thead>
        <tr>
          <th>
            <Group
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("name")}
            >
              Nome
              <ThemeIcon variant="light" color={sort === "name" ? "" : "gray"}>
                {sort === "name" && order === "asc" ? (
                  <TbChevronUp size={15} />
                ) : (
                  <TbChevronDown size={15} />
                )}
              </ThemeIcon>
            </Group>
          </th>
          <th>
            <Group
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("email")}
            >
              E-mail
              <ThemeIcon variant="light" color={sort === "email" ? "" : "gray"}>
                {sort === "email" && order === "asc" ? (
                  <TbChevronUp size={15} />
                ) : (
                  <TbChevronDown size={15} />
                )}
              </ThemeIcon>
            </Group>
          </th>
          <th>
            <Group sx={{ cursor: "pointer" }} onClick={() => handleSort("cpf")}>
              Documento
              <ThemeIcon variant="light" color={sort === "cpf" ? "" : "gray"}>
                {sort === "cpf" && order === "asc" ? (
                  <TbChevronUp size={15} />
                ) : (
                  <TbChevronDown size={15} />
                )}
              </ThemeIcon>
            </Group>
          </th>
          <th>
            <Group sx={{ cursor: "pointer" }}>
              Situação
              <ThemeIcon
                variant="light"
                color={sort === "status" ? "" : "gray"}
              >
                {sort === "status" && order === "asc" ? (
                  <TbChevronUp size={15} />
                ) : (
                  <TbChevronDown size={15} />
                )}
              </ThemeIcon>
            </Group>
          </th>
          <th style={{ width: "6rem" }}>Açoes</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
          ))}
      </tbody>
    </Table>
  );
};
