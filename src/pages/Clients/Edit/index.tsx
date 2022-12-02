import { useFetchClientById } from "@/services/features/clients/hooks/useFetchClientById";
import useStore from "@/store";
import { Paper, Tabs, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { TbAd2, TbUsers } from "react-icons/tb";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ClientEditForm } from "./ClientEditForm";
import { ClientEditFormSkeleton } from "./ClientEditFormSkeleton";
import { ServiceOrderTab } from "./components/ServiceOrderTab";

export const ClientEdit = () => {
  const theme = useMantineTheme();
  const params = useParams();
  const location = useLocation();
  const store = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>(
    location.pathname.includes("service-orders") ? "service-orders" : "client"
  );
  const { data, isFetching, isLoading } = useFetchClientById(params.id || "");
  const onTabChange = () => {
    if (location.pathname.includes(`service-orders/${params.osId}/edit`)) {
      return [
        {
          name: `Edição - ${data?.name}`,
          path: `/clients/${params.id}/edit`,
        },
        {
          name: "Ordens de Serviço",
          path: `/clients/${params.id}/edit/service-orders`,
        },
        {
          name: `Visão Geral - ${params.osId}`,
          path: `/clients/${params.id}/edit/service-orders/${params.osId}/edit`,
        },
      ];
    }
    if (location.pathname.includes(`service-orders/${params.osId}/over-view`)) {
      return [
        {
          name: `Edição - ${data?.name}`,
          path: `/clients/${params.id}/edit`,
        },
        {
          name: "Ordens de Serviço",
          path: `/clients/${params.id}/edit/service-orders`,
        },
        {
          name: `Visão Geral - ${params.osId}`,
          path: `/clients/${params.id}/edit/service-orders/${params.osId}/over-view`,
        },
      ];
    }
    if (location.pathname.includes("service-orders/create")) {
      return [
        {
          name: `Edição - ${data?.name}`,
          path: `/clients/${params.id}/edit`,
        },
        {
          name: "Ordens de Serviço",
          path: `/clients/${params.id}/edit/service-orders`,
        },
        {
          name: "Cadastro",
          path: `/clients/${params.id}/edit/service-orders/create`,
        },
      ];
    }
    if (activeTab === "client") {
      return [
        {
          name: `Edição - ${data?.name}`,
          path: `/clients/${params.id}/edit`,
        },
      ];
    } else {
      return [
        {
          name: `Edição - ${data?.name}`,
          path: `/clients/${params.id}/edit`,
        },
        {
          name: "Ordens de Serviço",
          path: `/clients/${params.id}/edit/service-orders`,
        },
      ];
    }
  };

  useEffect(() => {
    if (!isFetching) {
      store.setNewBreadcrumbs({
        name: "Clientes",
        path: "/clients",
        icon: <TbUsers size={25} />,
        subhead: onTabChange(),
      });
      store.setServiceOrdersFilter({
        page: 1,
        order: "asc",
        search: "",
        sort: "name",
      });
    }
    setActiveTab(
      location.pathname.includes("service-orders") ? "service-orders" : "client"
    );
  }, [isFetching, location, activeTab]);

  return (
    <>
      {location.pathname.includes("service-orders/create") ||
      location.pathname.includes(`service-orders/${params.osId}`) ? (
        <Outlet context={data} />
      ) : (
        <Paper withBorder sx={{ padding: "1.5rem" }}>
          <Tabs value={activeTab} onTabChange={setActiveTab} variant="outline">
            <Tabs.List>
              <Tabs.Tab
                value="client"
                onClick={() => navigate("")}
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
                  <Text
                    color={
                      theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"
                    }
                  >
                    Clientes
                  </Text>
                ) : (
                  <Text>Clientes</Text>
                )}
              </Tabs.Tab>
              <Tabs.Tab
                value="service-orders"
                onClick={() => navigate("service-orders")}
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
                  <Text
                    color={
                      theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"
                    }
                  >
                    Ordens de Serviço
                  </Text>
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
              <Outlet />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      )}
    </>
  );
};
