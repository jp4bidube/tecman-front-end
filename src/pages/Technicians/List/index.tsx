import { PaginationSkeleton } from "@/components/PaginationSkeleton";
import { useFetchTechnicians } from "@/services/features/technicians/hooks/useFetchTechnicians";
import { useToggleDisableUser } from "@/services/features/users/hooks/useToggleDisableUser";
import useStore from "@/store";
import { User } from "@/types/user";
import {
  Button,
  Grid,
  Group,
  MediaQuery,
  Pagination,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { TechniciansCards } from "../components/techniciansCards";
import { TechniciansTable } from "../components/techniciansTable";
import { TechniciansTableSkeleton } from "./TechniciansTableSkeleton";

export const TechniciansList = () => {
  const store = useStore();
  const { search } = store.techniciansFilter;

  const { data, isFetching, isLoading } = useFetchTechnicians(
    store.techniciansFilter
  );

  const [keySearch, setKeySearch] = useState(search);

  const mutation = useToggleDisableUser();

  const handleSearch = () => {
    store.setTechniciansFilter({
      ...store.techniciansFilter,
      search: keySearch,
      page: 1,
    });
  };

  const handleClear = () => {
    setKeySearch("");
    store.setTechniciansFilter({ ...store.techniciansFilter, search: "" });
  };

  const handleToggleDisableUser = async (id: number) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    store.setTechniciansFilter({
      page: 1,
      order: "desc",
      search: "",
      sort: "name",
    });
  }, []);

  const openInactiveTechModal = (id: number, user: User) => {
    openConfirmModal({
      title: (
        <Title order={4}>
          {user.employeeStatus.status === "Ativo"
            ? "Desativar Técnico"
            : "Ativar Técnico"}
        </Title>
      ),
      centered: true,
      children: (
        <Text size="sm">
          {user.employeeStatus.status === "Ativo"
            ? "Tem certeza de que deseja desativar esse Técnico?"
            : "Ao ativar o técnico será capaz de ser vinculado a uma OS."}
        </Text>
      ),
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      confirmProps: {
        color: user.employeeStatus.status === "Ativo" ? "red" : "primary",
        radius: "xl",
        variant: "outline",
      },
      cancelProps: { radius: "xl" },
      onConfirm: () => handleToggleDisableUser(id),
    });
  };

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
              <TechniciansCards
                technicians={data?.technicians}
                confirmInactivation={openInactiveTechModal}
              />
            </div>
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <div>
              {isFetching ? (
                <TechniciansTableSkeleton />
              ) : (
                <TechniciansTable
                  technicians={data?.technicians}
                  confirmInactivation={openInactiveTechModal}
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
                page={store.techniciansFilter.page}
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
