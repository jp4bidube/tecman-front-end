import { useToggleDisableUser } from "@/services/features/users/hooks/useToggleDisableUser";
import { useFetchUsers } from "@/services/features/users/hooks/useFetchUsers";
import useStore from "@/store";
import { User } from "@/types/user";
import {
  Button,
  Grid,
  Group,
  MediaQuery,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { UsersCards } from "../components/usersCards";
import { UsersTable } from "../components/usersTable";
import { UsersTableSkeleton } from "./UserTableSkeleton";

export const UsersList = () => {
  const store = useStore();
  const { page, order, search, sort } = store.usersFilter;
  const { data, isFetching, isLoading } = useFetchUsers(
    page,
    order,
    sort,
    search
  );
  const [keySearch, setKeySearch] = useState(search);

  const mutation = useToggleDisableUser();

  const handleSearch = () => {
    store.setFilter({ ...store.usersFilter, search: keySearch, page: 1 });
  };

  const handleClear = () => {
    setKeySearch("");
    store.setFilter({ ...store.usersFilter, search: "" });
  };
  const handleToggleDisableUser = async (id: number) => {
    mutation.mutate(id);
  };

  const openInactiveUserModal = (id: number, user: User) => {
    openConfirmModal({
      title: (
        <Title order={4}>
          {user.employeeStatus.status === "Ativo"
            ? "Desativar usuário"
            : "Ativar usuário"}
        </Title>
      ),
      centered: true,
      children: (
        <Text size="sm">
          {user.employeeStatus.status === "Ativo"
            ? "Tem certeza de que deseja desativar esse usuário? Esta ação impedirá o usuário de realizar login na aplicação."
            : "Ao ativar o usuário será capaz de realizar login."}
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
              <UsersCards
                users={data?.users}
                confirmInactivation={openInactiveUserModal}
              />
            </div>
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <div>
              {isFetching ? (
                <UsersTableSkeleton />
              ) : (
                <UsersTable
                  users={data?.users}
                  confirmInactivation={openInactiveUserModal}
                />
              )}
            </div>
          </MediaQuery>
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
                total={data?.total ? Math.ceil(data.total / 5) : 1}
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
