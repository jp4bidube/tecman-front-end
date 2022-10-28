import { Th } from "@/components/Th";
import useStore from "@/store";
import { Badge, Group, Table, ThemeIcon, Tooltip } from "@mantine/core";

import { TbEdit, TbUser, TbUserOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { TechniciansTableSkeleton } from "../List/TechniciansTableSkeleton";
import { User } from "@/types/user";

type UsersTableProps = {
  technicians: User[] | undefined;
  confirmInactivation: (id: number, technician: User) => void;
  isFetching: boolean;
};

export const TechniciansTable = ({
  technicians,
  confirmInactivation,
  isFetching,
}: UsersTableProps) => {
  console.log(technicians);
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.techniciansFilter;

  const handleSort = (column: string) => {
    store.setTechniciansFilter({
      ...store.techniciansFilter,
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
          <TechniciansTableSkeleton />
        ) : (
          technicians &&
          technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.name}</td>
              <td>{technician.email}</td>
              <td>
                <Badge color="tecman">{technician.role.role}</Badge>
              </td>
              <td>{technician.cpf}</td>
              <td>
                <Badge
                  color={
                    technician.employeeStatus.status === "Ativo"
                      ? "teal"
                      : "red"
                  }
                >
                  {technician.employeeStatus.status}
                </Badge>
              </td>
              <td>
                <Group>
                  <Tooltip label="Editar" withArrow>
                    <ThemeIcon
                      variant="light"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/technicians/${technician.id}/edit`)
                      }
                    >
                      <TbEdit />
                    </ThemeIcon>
                  </Tooltip>
                  {technician.employeeStatus.status === "Ativo" ? (
                    <Tooltip label="Desativar usuário" withArrow>
                      <ThemeIcon
                        color="red"
                        variant="light"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          confirmInactivation(technician.id, technician)
                        }
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
                        onClick={() =>
                          confirmInactivation(technician.id, technician)
                        }
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
