import { useFetchOSById } from "@/services/features/serviceOrders/hooks/useFetchOSById";
import useStore from "@/store";
import { Paper, Tabs, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { TbAd2, TbFileText } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { FinishOSForm } from "./components/FinishOS";
import Guarantees from "./components/Guarantees";
import { OSOverViewForm } from "./OSOverViewForm";

export const ServiceOrdersOverView = () => {
  const store = useStore();
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<string | null>("service-orders");
  const [opened, setOpened] = useState<boolean>(false);

  const { id, osId } = useParams();
  const { data, isFetching } = useFetchOSById(osId || id || "");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
        subhead: [
          {
            name: `Visão Geral - ${osId || id}`,
            path: `/service-orders/${osId || id}/over-view`,
          },
        ],
      }),
    []
  );

  return (
    <Paper withBorder p=".3rem 1.5rem 1.5rem">
      <Tabs value={activeTab} onTabChange={setActiveTab} variant="outline">
        <Tabs.List>
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
              <Text
                color={theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"}
              >
                Ordem de Serviço
              </Text>
            ) : (
              <Text>Ordem de Serviço</Text>
            )}
          </Tabs.Tab>
          {!isFetching && data!.orderServiceStatus.id === 2 ? (
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
                <Text
                  color={theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"}
                >
                  Garantia
                </Text>
              ) : (
                <Text>Garantia</Text>
              )}
            </Tabs.Tab>
          ) : null}
        </Tabs.List>
        <Tabs.Panel value="service-orders" pt="xl">
          {!isFetching && (
            <OSOverViewForm handleFinishOS={setOpened} data={data!} />
          )}
          {!isFetching && opened && (
            <FinishOSForm opened={opened} setOpened={setOpened} os={data!} />
          )}
        </Tabs.Panel>
        {!isFetching && data!.orderServiceStatus.id === 2 ? (
          <Tabs.Panel value="guarantees" pt="xl">
            <Guarantees os={data!} />
          </Tabs.Panel>
        ) : null}
      </Tabs>
    </Paper>
  );
};
