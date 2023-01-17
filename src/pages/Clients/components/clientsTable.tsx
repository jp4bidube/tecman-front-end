import { Th } from "@/components/Th";
import useStore from "@/store";
import { ClientList } from "@/types/clients";
import { Group, Table, Text, ThemeIcon, Tooltip } from "@mantine/core";

import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type ClientsTableProps = {
  clients: ClientList[] | undefined;
  select?: (id: number) => void;
  noEdit?: boolean;
};

export const ClientsTable = ({
  clients,
  noEdit = false,
  select,
}: ClientsTableProps) => {
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
    <Table
      verticalSpacing="sm"
      striped
      highlightOnHover={select !== undefined ? true : false}
    >
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
          {!noEdit ? (
            <th style={{ width: "6rem" }}>
              <Text size="xs" tt="capitalize">
                Açoes
              </Text>
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {clients &&
          clients.map((client) => (
            <tr
              style={{ cursor: noEdit ? "pointer" : "initial" }}
              key={client.id}
              onClick={() => {
                if (noEdit) {
                  select!(client.id);
                }
              }}
            >
              <td>
                <Text size="xs" tt="capitalize">
                  {client.name}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {client.street}
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
                {!noEdit ? (
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
                ) : null}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
