import { useFetchClients } from "@/services/features/clients/hooks/useFetchClients";
import useStore from "@/store";
import {
  Button,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Table,
  TextInput,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { TbChevronDown, TbChevronUp, TbEdit, TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const ClientsOSTable = () => {
  const navigate = useNavigate();

  const store = useStore();

  const { page, order, search, sort } = store.clientsFilter;
  const { data, isFetching, isLoading } = useFetchClients(
    page,
    order,
    sort,
    search
  );
  const [keySearch, setKeySearch] = useState(search);

  const handleSearch = () => {
    store.setClientsFilter({
      ...store.clientsFilter,
      search: keySearch,
      page: 1,
    });
  };

  const handleClear = () => {
    setKeySearch("");
    store.setClientsFilter({ ...store.clientsFilter, search: "" });
  };

  useEffect(() => {
    store.setClientsFilter({
      page: 1,
      order: "desc",
      search: "",
      sort: "name",
    });
  }, []);

  const handleSort = (column: string) => {
    store.setClientsFilter({
      ...store.clientsFilter,
      sort: column,
      order: order === "desc" ? "asc" : "desc",
    });
  };

  return (
    <>
      <Grid gutter="xl">
        <Grid.Col span={12}>
          <Grid gutter="xl" mb={20}>
            <Grid.Col xs={12} md={4}>
              <TextInput
                value={keySearch}
                onChange={(e: any) => setKeySearch(e.target.value)}
                icon={<TbSearch />}
                placeholder="Pesquisar"
                onKeyDown={({ key }) => key === "Enter" && handleSearch()}
                width={200}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <Group>
                <Button
                  radius="xl"
                  onClick={handleSearch}
                  disabled={isFetching}
                >
                  Buscar
                </Button>
                <Button
                  variant="light"
                  radius="xl"
                  onClick={handleClear}
                  disabled={isFetching}
                >
                  Limpar
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12}>
          <Table verticalSpacing="sm" striped>
            <thead>
              <tr>
                <th>
                  <Group
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleSort("name")}
                  >
                    Nome
                    <ThemeIcon
                      variant="light"
                      color={sort === "name" ? "" : "gray"}
                    >
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
                    <ThemeIcon
                      variant="light"
                      color={sort === "email" ? "" : "gray"}
                    >
                      {sort === "email" && order === "asc" ? (
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
                    onClick={() => handleSort("cpf")}
                  >
                    Documento
                    <ThemeIcon
                      variant="light"
                      color={sort === "cpf" ? "" : "gray"}
                    >
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
              {data?.clients &&
                data?.clients.map((client) => (
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
                            onClick={() =>
                              navigate(`/clients/${client.id}/edit`)
                            }
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
        </Grid.Col>
        <Grid.Col span={12} mt={15}>
          <Stack align="center">
            {isLoading || isFetching ? (
              <Grid gutter="xs">
                <Grid.Col span={3}>
                  <Skeleton height={32} circle />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={32} circle />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={32} circle />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={32} circle />
                </Grid.Col>
              </Grid>
            ) : (
              <Pagination
                page={store.usersFilter.page}
                total={data?.total ? Math.ceil(data.total / 10) : 1}
                onChange={(page) => store.setPage(page)}
                radius="xl"
              />
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};
