import { PaginationSkeleton } from "@/components/PaginationSkeleton";
import { OSTableSkeleton } from "@/pages/ServiceOrders/List/OSTableSkeleton";
import { useFetchClientById } from "@/services/features/clients/hooks/useFetchClientById";
import { useFetchOSByClientId } from "@/services/features/serviceOrders/hooks/useFetchOSByClientId";
import useStore from "@/store";
import {
  Button,
  Center,
  Grid,
  Group,
  Pagination,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { TbAd2, TbPlus, TbSearch, TbUsers } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { ClientsOSTable } from "../components/clientsOSTable";
import { ClientEditForm } from "./ClientEditForm";
import { ClientEditFormSkeleton } from "./ClientEditFormSkeleton";

export const ClientEdit = () => {
  const theme = useMantineTheme();
  const params = useParams();
  const store = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>("client");
  const { data, isFetching, isLoading } = useFetchClientById(params.id || "");
  const clientId = data?.id;

  const clientOS = useFetchOSByClientId(clientId!, store.serviceOrdersFilter);
  const [keySearch, setKeySearch] = useState(store.serviceOrdersFilter.search);

  useEffect(() => {
    store.setNewBreadcrumbs({
      name: "Clientes",
      path: "/clients",
      icon: <TbUsers size={25} />,
      subhead: `Edição - ${data?.name}`,
    }),
      store.setServiceOrdersFilter({
        page: 1,
        order: "desc",
        search: "",
        sort: "name",
      });
  }, [data]);

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
    <Paper withBorder sx={{ padding: "1.5rem" }}>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab
            value="client"
            icon={
              activeTab === "client" ? (
                <ThemeIcon variant="light">
                  <TbUsers size={20} />
                </ThemeIcon>
              ) : (
                <TbUsers size={20} />
              )
            }
          >
            {activeTab === "client" ? (
              <Title
                order={5}
                color={theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"}
              >
                Clientes
              </Title>
            ) : (
              <Text>Clientes</Text>
            )}
          </Tabs.Tab>
          <Tabs.Tab
            value="service-orders"
            icon={
              activeTab === "service-orders" ? (
                <ThemeIcon variant="light">
                  <TbAd2 size={20} />
                </ThemeIcon>
              ) : (
                <TbAd2 size={20} />
              )
            }
          >
            {activeTab === "service-orders" ? (
              <Title
                order={5}
                color={theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"}
              >
                Ordens de Serviço
              </Title>
            ) : (
              <Text>Ordens de Serviço</Text>
            )}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="client" pt="xl">
          {isLoading || isFetching ? (
            <ClientEditFormSkeleton />
          ) : (
            <ClientEditForm client={data!} />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="service-orders" pt="xl">
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
                  onClick={() =>
                    navigate("/service-orders/create", {
                      state: { client: data },
                    })
                  }
                  leftIcon={<TbPlus size={20} />}
                >
                  Cadastrar OS
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
          {isFetching ? (
            <OSTableSkeleton />
          ) : (
            <Stack>
              <ClientsOSTable
                isFetching={clientOS?.isFetching}
                serviceOrders={clientOS?.data?.serviceOrders!}
              />
              <Center>
                {clientOS?.isFetching ? (
                  <PaginationSkeleton />
                ) : (
                  <Pagination
                    page={store.serviceOrdersFilter.page}
                    total={
                      clientOS?.data?.total
                        ? Math.ceil(clientOS?.data.total / 5)
                        : 1
                    }
                    onChange={(page) => store.setServiceOrdersPage(page)}
                    radius="xl"
                  />
                )}
              </Center>
            </Stack>
          )}
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
