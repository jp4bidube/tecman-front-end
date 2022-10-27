import { useEffect, useState } from "react";
import useStore from "@/store";
import {
  Paper,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { TbAd2, TbFileText } from "react-icons/tb";
import { OSOverViewForm } from "./OSOverViewForm";

export const ServiceOrdersOverView = () => {
  const store = useStore();
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<string | null>("service-orders");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
        subhead: `Visão Geral`,
      }),
    []
  );

  return (
    <Paper withBorder p=".3rem 1.5rem 1.5rem">
      <Tabs value={activeTab} onTabChange={setActiveTab}>
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
              <Title
                order={5}
                color={theme.colorScheme === "dark" ? "tecman.3" : "tecman.6"}
              >
                Garantias
              </Title>
            ) : (
              <Text>Garantias</Text>
            )}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="service-orders" pt="xl">
          <OSOverViewForm />
        </Tabs.Panel>
        <Tabs.Panel value="guarantees" pt="xl">
          <h1>test</h1>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};