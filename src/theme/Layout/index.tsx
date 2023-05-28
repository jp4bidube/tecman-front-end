import { useMe } from "@/services/features/users/hooks/useMe";
import useStore from "@/store";
import {
  AppShell,
  Box,
  Burger,
  Drawer,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { AccountSettingsLink } from "./components/AccountSettingsLink";
import { Brand } from "./components/Brand";
import { MainLinks } from "./components/MainLink";

export const Layout = () => {
  const theme = useMantineTheme();
  const { isMenuOpen, setIsMenuOpen } = useStore();

  const me = useMe();

  return (
    <AppShell
      navbarOffsetBreakpoint="xl"
      asideOffsetBreakpoint="xs"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="xl"
          sx={{ transition: "500ms" }}
          hidden
          width={{ sm: 250, lg: 300 }}
        >
          <Navbar.Section>
            <Brand />
          </Navbar.Section>
          <Navbar.Section grow mt="md" component={ScrollArea}>
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
        <Box sx={{ height: "90vh", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Brand />
            <MainLinks />
          </Box>
          <AccountSettingsLink />
        </Box>
      </Drawer>
      <Group position="apart" sx={{ marginBottom: "1.6rem" }}>
        <Group>
          <MediaQuery largerThan="xl" styles={{ display: "none" }}>
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
      <div>
        <Outlet />
      </div>
    </AppShell>
  );
};
