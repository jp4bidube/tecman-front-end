import { PaginationSkeleton } from "@/components/PaginationSkeleton";
import { ClientsOSTable } from "@/pages/Clients/components/clientsOSTable";
import { useFetchOSByClientId } from "@/services/features/serviceOrders/hooks/useFetchOSByClientId";
import useStore from "@/store";
import {
  Button,
  Center,
  Grid,
  Group,
  Pagination,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

export const ServiceOrderTab = () => {
  const params = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const { data, isFetching } = useFetchOSByClientId(
    +params.id!,
    store.serviceOrdersFilter
  );

  const [keySearch, setKeySearch] = useState(store.serviceOrdersFilter.search);
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
  return (
    <>
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
        <Grid.Col xs={12} md={4}>
          <Group position="right">
            <Button
              radius="xl"
              onClick={() => navigate("create")}
              leftIcon={<TbPlus size={20} />}
            >
              Cadastrar OS
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Stack>
        <ClientsOSTable
          isFetching={isFetching}
          serviceOrders={data?.serviceOrders!}
        />
        <Center>
          {isFetching ? (
            <PaginationSkeleton />
          ) : (
            <Pagination
              page={store.serviceOrdersFilter.page}
              total={data?.total ? Math.ceil(data.total / 10) : 1}
              onChange={(page) => store.setServiceOrdersPage(page)}
              radius="xl"
            />
          )}
        </Center>
      </Stack>
    </>
  );
};
