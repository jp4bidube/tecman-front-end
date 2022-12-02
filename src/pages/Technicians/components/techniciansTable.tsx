import { Th } from "@/components/Th";
import useStore from "@/store";
import {
  Badge,
  Flex,
  Group,
  Table,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";

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
              Açoes
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {isFetching ? (
          <TechniciansTableSkeleton />
        ) : (
          technicians &&
          technicians.map((technician) => (
            <tr key={technician.id}>
              <td>
                <Text size="xs" tt="capitalize">
                  {technician.name}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="lowercase">
                  {technician.email}
                </Text>
              </td>
              <td>
                <Badge color="tecman">
                  <Text size="xs" tt="capitalize">
                    {technician.role.role}
                  </Text>
                </Badge>
              </td>
              <td>
                {" "}
                <Text size="xs" tt="capitalize">
                  {technician.cpf}
                </Text>
              </td>
              <td>
                <Badge
                  color={
                    technician.employeeStatus.status === "Ativo"
                      ? "teal"
                      : "red"
                  }
                >
                  <Text size="xs" tt="capitalize">
                    {technician.employeeStatus.status}
                  </Text>
                </Badge>
              </td>
              <td>
                <Flex gap={10}>
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
                </Flex>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
