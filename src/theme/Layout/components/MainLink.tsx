import {
  ActionIcon,
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import {
  TbAd2,
  TbAddressBook,
  TbChevronDown,
  TbFileText,
  TbUserCircle,
  TbUsers,
} from "react-icons/tb";
import { IoBuildOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface MainLinkProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

function MainLink({ icon, label, path }: MainLinkProps) {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={() => navigate(path)}
    >
      <Group>
        <ThemeIcon variant="light">{icon}</ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data: MainLinkProps[] = [
  {
    icon: <TbUsers size={16} />,
    label: "Clientes",
    path: "/clients",
  },
  {
    icon: <TbAd2 size={16} />,
    label: "Ordens de Serviço",
    path: "/service-orders",
  },
  {
    icon: <TbFileText size={16} />,
    label: "Garantias",
    path: "/guarantees",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  const [openAdmin, setOpenAdmin] = useState(false);

  return (
    <div>
      {links}
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          backgroundColor: openAdmin
            ? theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[1]
            : "default",
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
        onClick={() => setOpenAdmin(!openAdmin)}
      >
        <Group position="apart">
          <Group>
            <ThemeIcon variant="light">
              <TbAddressBook size={16} />
            </ThemeIcon>
            <Text size="sm">Administrativo</Text>
          </Group>
          <ActionIcon color="primary" variant="transparent">
            <TbChevronDown
              size={16}
              style={{
                transform: openAdmin ? "rotate(180deg)" : "rotate(0deg)",
                transition: "500ms",
              }}
            />
          </ActionIcon>
        </Group>
      </UnstyledButton>
      <Collapse in={openAdmin}>
        <Box
          sx={(theme) => ({
            marginLeft: "2rem",
            paddingLeft: ".5rem",
            marginTop: ".5rem",
            borderColor: "0.5",
            borderLeft: `2px solid ${theme.colors.tecman[3] + "8C"}`,
          })}
        >
          <MainLink
            icon={<TbUserCircle size={16} />}
            label="Funcionários"
            path="/users"
          />
          {/* <MainLink
            icon={<IoBuildOutline size={16} />}
            label="Técnicos"
            path="/users"
          /> */}
        </Box>
      </Collapse>
    </div>
  );
}
