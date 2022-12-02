import { Th } from "@/components/Th";
import useStore from "@/store";
import { ClientList } from "@/types/clients";
import { Group, Table, Text, ThemeIcon, Tooltip } from "@mantine/core";

import { TbChevronDown, TbChevronUp, TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type ClientsTableProps = {
  clients: ClientList[] | undefined;
};

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.clientsFilter;

  const handleSort = (column: string) => {
    store.setClientsFilter({
      ...store.clientsFilter,
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
          <Th onSort={handleSort} columnName="street" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Endereço
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="cpf" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Documento
            </Text>
          </Th>
          <Th
            onSort={handleSort}
            columnName="phoneNumber"
            sort={sort}
            order={order}
          >
            <Text size="xs" tt="capitalize">
              Telefone
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
        {clients &&
          clients.map((client) => (
            <tr key={client.id}>
              <td>
                <Text size="xs" tt="capitalize">
                  {client.name}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {client.district}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {client.cpf}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {client.phoneNumber}
                </Text>
              </td>
              <td>
                <Group>
                  <Tooltip label="Editar" withArrow>
                    <ThemeIcon
                      variant="light"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/clients/${client.id}/edit`)}
                    >
                      <TbEdit />
                    </ThemeIcon>
                  </Tooltip>
                </Group>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
