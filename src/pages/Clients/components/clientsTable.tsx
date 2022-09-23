import useStore from "@/store";
import { Client } from "@/types/clients";
import { Group, Table, ThemeIcon, Tooltip } from "@mantine/core";

import { TbChevronDown, TbChevronUp, TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type ClientsTableProps = {
  clients: Client[] | undefined;
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
            <Group
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("number")}
            >
              Telefone
              <ThemeIcon
                variant="light"
                color={sort === "number" ? "" : "gray"}
              >
                {sort === "number" && order === "asc" ? (
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
        {clients &&
          clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.cpf}</td>
              <td>{client.phoneNumber}</td>
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
