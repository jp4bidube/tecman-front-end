import { PaginationSkeleton } from "@/components/PaginationSkeleton";
import { useFetchClients } from "@/services/features/clients/hooks/useFetchClients";
import useStore from "@/store";
import {
  Button,
  Grid,
  Group,
  MediaQuery,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { ClientsCards } from "../components/clientsCards";
import { ClientsTable } from "../components/clientsTable";
import { ClientsTableSkeleton } from "./ClientsTableSkeleton";

export const ClientsList = () => {
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

  return (
    <Paper withBorder sx={{ padding: "1.5rem" }}>
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
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div>
              <ClientsCards clients={data?.clients} />
            </div>
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <div>
              {isFetching ? (
                <ClientsTableSkeleton />
              ) : (
                <ClientsTable clients={data?.clients} />
              )}
            </div>
          </MediaQuery>
        </Grid.Col>
        <Grid.Col span={12} mt={15}>
          <Stack align="center">
            {isLoading || isFetching ? (
              <PaginationSkeleton />
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
    </Paper>
  );
};
