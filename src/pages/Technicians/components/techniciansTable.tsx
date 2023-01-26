import { Th } from "@/components/Th";
import useStore from "@/store";
import { ActionIcon, Badge, Flex, Table, Text, Tooltip } from "@mantine/core";

import { usePermission } from "@/hooks/usePermission";
import { User } from "@/types/user";
import { TbEdit, TbUser, TbUserOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { TechniciansTableSkeleton } from "../List/TechniciansTableSkeleton";

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
  const hasPermission = usePermission();

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
                  {hasPermission ? technician.cpf : "*************"}
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
                  <Tooltip
                    label={
                      !hasPermission
                        ? "Usuário não tem permissão para executar esta ação"
                        : "Editar Técnico"
                    }
                    withArrow
                  >
                    <span>
                      <ActionIcon
                        disabled={!hasPermission}
                        variant="light"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/technicians/${technician.id}/edit`)
                        }
                      >
                        <TbEdit />
                      </ActionIcon>
                    </span>
                  </Tooltip>
                  {technician.employeeStatus.status === "Ativo" ? (
                    <Tooltip
                      label={
                        !hasPermission
                          ? "Usuário não tem permissão para executar esta ação"
                          : "Desativar Técnico"
                      }
                      withArrow
                    >
                      <span>
                        <ActionIcon
                          disabled={!hasPermission}
                          color="red"
                          variant="light"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            confirmInactivation(technician.id, technician)
                          }
                        >
                          <TbUserOff />
                        </ActionIcon>
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label={
                        !hasPermission
                          ? "Usuário não tem permissão para executar esta ação"
                          : "Ativar Técnico"
                      }
                      withArrow
                    >
                      <span>
                        <ActionIcon
                          disabled={!hasPermission}
                          color="teal"
                          variant="light"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            confirmInactivation(technician.id, technician)
                          }
                        >
                          <TbUser />
                        </ActionIcon>
                      </span>
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
