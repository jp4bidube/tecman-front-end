import useStore from "@/store";
import {
  ActionIcon,
  Box,
  Group,
  Image,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { TbMoonStars, TbSun } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.webp";

export function Brand() {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useStore();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const handleClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };
  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <Image
          src={logo}
          alt="Logo"
          sx={{ maxWidth: 200, minWidth: 100, cursor: "pointer" }}
          onClick={handleClick}
        />
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === "dark" ? (
            <TbSun size={16} />
          ) : (
            <TbMoonStars size={16} />
          )}
        </ActionIcon>
      </Group>
    </Box>
  );
}
