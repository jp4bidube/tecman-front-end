import { PaginationSkeleton } from "@/components/PaginationSkeleton";
import { useFetchOS } from "@/services/features/serviceOrders/hooks/useFetchOS";
import useStore from "@/store";
import {
  Button,
  Grid,
  Group,
  MediaQuery,
  Pagination,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { OSCards } from "../components/OSCards";
import { OSTable } from "../components/OSTable";
import { OSTableSkeleton } from "./OSTableSkeleton";

export const ServiceOrdersList = () => {
  const store = useStore();
  const { search } = store.serviceOrdersFilter;

  const { data, isFetching, isLoading } = useFetchOS(store.serviceOrdersFilter);

  const [keySearch, setKeySearch] = useState(search);

  const handleSearch = () => {
    store.setServiceOrdersFilter({
      ...store.serviceOrdersFilter,
      search: keySearch,
      page: 1,
    });
  };

  const handleClear = () => {
    setKeySearch("");
    store.setServiceOrdersFilter({ ...store.serviceOrdersFilter, search: "" });
  };

  useEffect(() => {
    store.setServiceOrdersFilter({
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
                <Button radius="xl" onClick={handleSearch}>
                  Buscar
                </Button>
                <Button variant="light" radius="xl" onClick={handleClear}>
                  Limpar
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12}>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div>
              <OSCards
                serviceOrders={data?.serviceOrders}
                isFetching={isFetching}
              />
            </div>
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <div>
              {isFetching ? (
                <OSTableSkeleton />
              ) : (
                <OSTable
                  serviceOrders={data?.serviceOrders}
                  isFetching={isFetching}
                />
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
                page={store.serviceOrdersFilter.page}
                total={data?.total ? Math.ceil(data.total / 10) : 1}
                onChange={(page) => store.setServiceOrdersPage(page)}
                radius="xl"
                size="sm"
              />
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
