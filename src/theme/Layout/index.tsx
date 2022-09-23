import { useMe } from "@/services/features/users/hooks/useMe";
import useStore from "@/store";
import {
  AppShell,
  Burger,
  Container,
  Drawer,
  Grid,
  Group,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { AccountSettingsLink } from "./components/AccountSettingsLink";
import { Brand } from "./components/Brand";
import { MainLinks } from "./components/MainLink";
import PerfectScrollbar from "react-perfect-scrollbar";

export const Layout = () => {
  const theme = useMantineTheme();
  const { isMenuOpen, setIsMenuOpen } = useStore();

  const me = useMe();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          sx={{ transition: "500ms" }}
          hidden
          width={{ sm: 250, lg: 300 }}
        >
          <Navbar.Section>
            <Brand />
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <AccountSettingsLink />
          </Navbar.Section>
        </Navbar>
      }
    >
      <Drawer
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        padding="xl"
      >
        <Grid>
          <Grid.Col>
            <Brand />
          </Grid.Col>
          <Grid.Col mt="md" style={{ minHeight: "71vh" }}>
            <MainLinks />
          </Grid.Col>
          <Grid.Col>
            <AccountSettingsLink />
          </Grid.Col>
        </Grid>
      </Drawer>
      <Group position="apart" sx={{ marginBottom: "2rem" }}>
        <Group spacing={-20}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Breadcrumbs />
        </Group>
      </Group>
      <Container size="xl" sx={{ overflow: "hidden" }}>
        <Outlet />
      </Container>
    </AppShell>
  );
};
