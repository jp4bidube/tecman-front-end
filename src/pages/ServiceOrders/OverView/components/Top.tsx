import { ServiceOrders } from "@/types/serviceOrders";
import {
  ActionIcon,
  Badge,
  Button,
  createStyles,
  Grid,
  Group,
  Menu,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  TbAd2,
  TbArrowLeft,
  TbBookmark,
  TbChevronDown,
  TbEdit,
  TbPrinter,
  TbTrash,
  TbX,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type TopProps = {
  data: ServiceOrders;
  handleFinishOS: (value: boolean) => void;
};

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export const Top = ({ data, handleFinishOS }: TopProps) => {
  const navigate = useNavigate();
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  return (
    <Grid gutter="xl" mb={16}>
      <Grid.Col span={12}>
        <Group position="apart" align="baseline">
          <Group position="left">
            <Title order={5}>Número OS: </Title>
            <Title order={5} color="tecman">
              {data?.id}
            </Title>
          </Group>
          <Badge
            size="lg"
            color={data?.orderServiceStatus.id === 1 ? "orange" : "teal"}
          >
            {data?.orderServiceStatus?.status}
          </Badge>

          <Group noWrap spacing={0}>
            {data.orderServiceStatus.id === 1 ? (
              <Button
                radius="xl"
                onClick={() => handleFinishOS(true)}
                className={classes.button}
                leftIcon={<TbAd2 size={20} />}
              >
                Finalizar
              </Button>
            ) : (
              <Button
                radius="xl"
                className={classes.button}
                leftIcon={<TbPrinter size={20} />}
              >
                Imprimir
              </Button>
            )}

            <Menu transition="pop" position="bottom-end">
              <Menu.Target>
                <ActionIcon
                  variant="filled"
                  color={theme.primaryColor}
                  size={36}
                  className={classes.menuControl}
                >
                  <TbChevronDown size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {data.orderServiceStatus.id === 1 ? (
                  <Menu.Item
                    icon={<TbPrinter size={16} color={menuIconColor} />}
                  >
                    Imprimir
                  </Menu.Item>
                ) : null}

                <Menu.Item icon={<TbEdit size={16} color={menuIconColor} />}>
                  Editar
                </Menu.Item>
                <Menu.Item
                  icon={<TbArrowLeft size={16} color={menuIconColor} />}
                  onClick={() => navigate(-1)}
                >
                  Voltar
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Grid.Col>
    </Grid>
  );
};
