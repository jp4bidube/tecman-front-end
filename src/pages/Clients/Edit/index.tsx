import { useFetchClientById } from "@/services/features/clients/hooks/useFetchClientById";
import useStore from "@/store";
import { Paper, Tabs, Text, ThemeIcon, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { TbAd2, TbFileText, TbUsers } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { ClientsOSTable } from "../components/clientsOSTable";
import { ClientsTableSkeleton } from "../List/ClientsTableSkeleton";
import { ClientEditForm } from "./ClientEditForm";
import { ClientEditFormSkeleton } from "./ClientEditFormSkeleton";

export const ClientEdit = () => {
  const params = useParams();
  const store = useStore();
  const [activeTab, setActiveTab] = useState<string | null>("client");
  const { data, isFetching, isLoading } = useFetchClientById(params.id || "");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Clientes",
        path: "/clients",
        icon: <TbUsers size={25} />,
        subhead: `Edição - ${data?.name}`,
      }),
    [data]
  );

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
              <Title order={5} color="tecman.3">
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
              <Title order={5} color="tecman">
                Ordens de Serviço
              </Title>
            ) : (
              <Text>Ordens de Serviço</Text>
            )}
          </Tabs.Tab>
          <Tabs.Tab
            value="guarantees"
            icon={
              activeTab === "guarantees" ? (
                <ThemeIcon variant="light">
                  <TbFileText size={20} />
                </ThemeIcon>
              ) : (
                <TbFileText size={20} />
              )
            }
          >
            {activeTab === "guarantees" ? (
              <Title order={5} color="tecman">
                Garantias
              </Title>
            ) : (
              <Text>Garantias</Text>
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
          {isFetching ? <ClientsTableSkeleton /> : <ClientsOSTable />}
        </Tabs.Panel>

        <Tabs.Panel value="guarantees" pt="xl">
          {isFetching ? <ClientsTableSkeleton /> : <ClientsOSTable />}
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
