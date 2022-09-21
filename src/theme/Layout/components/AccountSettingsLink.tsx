import { useLogout } from "@/services/features/auth/hooks/Logout";
import useStore from "@/store";
import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { TbChevronLeft, TbChevronRight, TbLogout } from "react-icons/tb";

export function AccountSettingsLink() {
  const theme = useMantineTheme();
  const store = useStore();
  const mutation = useLogout();

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <Menu shadow="md" width={200} position="right">
      <Menu.Target>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar src={store.loggedUser.avatarUrl} radius="xl" />
              <Box sx={{ flex: 1 }}>
                <Text
                  size="sm"
                  weight={500}
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.colors.dark[3]
                  }
                >
                  {store.loggedUser.name}
                </Text>
                <Text color="dimmed" size="xs">
                  {store.loggedUser.email}
                </Text>
              </Box>

              {theme.dir === "ltr" ? (
                <TbChevronRight size={18} />
              ) : (
                <TbChevronLeft size={18} />
              )}
            </Group>
          </UnstyledButton>
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<TbLogout size={14} />} onClick={handleLogout}>
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
