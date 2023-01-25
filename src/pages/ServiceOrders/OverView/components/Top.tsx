import { InputDate } from "@/components/InputDate";
import { useCancelOS } from "@/services/features/serviceOrders/hooks/useCancelOS";
import { ServiceOrders } from "@/types/serviceOrders";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  Group,
  Menu,
  Modal,
  TextInput,
  Title,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { setHours, setMinutes } from "date-fns";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import {
  TbAd2,
  TbArrowLeft,
  TbChevronDown,
  TbEdit,
  TbPrinter,
} from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { absenceValidationSchema } from "../validationSchema";
import { GaranteeReport } from "./GaranteeReport";
import { OSReport } from "./OSReport";

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
  const params = useParams();
  const [opened, setOpened] = useState(false);
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];
  const componentRef = useRef<HTMLDivElement>(null);
  const componentGRef = useRef<HTMLDivElement>(null);

  const mutation = useCancelOS();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrintGarantee = useReactToPrint({
    content: () => componentGRef.current,
  });

  interface IForm {
    date: Date;
    hours?: Date | null;
    obs: string;
  }

  const formik = useFormik({
    initialValues: {
      date: data.scheduledAttendance!,
      hours: null,
      obs: "",
    } as IForm,
    validationSchema: absenceValidationSchema,
    onSubmit: (values) => {
      const hour = setMinutes(
        setHours(values.hours!, values.hours?.getHours()!),
        values.hours?.getMinutes()!
      ).getTime();
      console.log(hour);
      let payload = {
        ...values,
      };
      delete payload.hours;
      mutation.mutate({ payload, id: data.id });
    },
  });

  const { values, touched, errors, ...actions } = formik;
  return (
    <>
      <Grid gutter="xl" mb={8}>
        <Grid.Col span={12}>
          <Group position="apart" align="baseline">
            <Group position="left">
              <Title order={5}>Número OS: </Title>
              <Badge variant="dot" size="lg" color="tecman">
                {data?.id}
              </Badge>
            </Group>
            <Badge
              size="lg"
              color={
                data?.orderServiceStatus?.id === 1
                  ? "orange"
                  : data?.orderServiceStatus?.id === 3
                  ? "red"
                  : "teal"
              }
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
                  onClick={handlePrint}
                >
                  Imprimir OS
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
                      onClick={handlePrint}
                    >
                      Imprimir OS
                    </Menu.Item>
                  ) : null}
                  <Menu.Item
                    icon={<TbPrinter size={16} color={menuIconColor} />}
                    onClick={handlePrintGarantee}
                  >
                    Imprimir Garantia
                  </Menu.Item>
                  {data.orderServiceStatus.id === 1 ? (
                    <Menu.Item
                      icon={<MdOutlineCancel size={16} color={menuIconColor} />}
                      onClick={() => setOpened(true)}
                    >
                      Cancelar OS
                    </Menu.Item>
                  ) : null}

                  <Menu.Item
                    icon={<TbEdit size={16} color={menuIconColor} />}
                    onClick={() =>
                      navigate(
                        params.osId
                          ? `/clients/${params.id}/edit/service-orders/${params.osId}/edit`
                          : `/service-orders/${data?.id}/edit`
                      )
                    }
                  >
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
      <Modal
        opened={opened}
        centered
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title={<Title order={4}>Cancelar OS por ausência em visita</Title>}
      >
        <form onSubmit={actions.handleSubmit}>
          <Grid mb={20}>
            <Grid.Col xs={12} md={6}>
              <InputDate
                readOnly
                placeholder="Ausencia"
                label="Ausência"
                name="date"
                formik={formik}
                value={new Date(values.date!)}
                withAsterisk
                minDate={new Date(data.scheduledAttendance!)}
                maxDate={new Date(data.scheduledAttendance!)}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TimeInput
                label="Horário"
                id="hours"
                name="hours"
                clearable
                value={values.hours}
                onChange={(value) => formik.setFieldValue("hours", value)}
                error={touched?.hours && errors?.hours}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={12} md={12}>
              <TextInput
                placeholder="Digite quem informou a ausência"
                label="Quem informou a ausência"
                id="obs"
                name="obs"
                value={values?.obs}
                onChange={actions.handleChange}
                error={touched.obs && errors.obs}
                withAsterisk
              />
            </Grid.Col>
          </Grid>
          <Divider />
          <Group align="flex-end" mt={20}>
            <Button radius="xl" type="submit">
              Salvar
            </Button>
            <Button
              radius="xl"
              variant="outline"
              type="button"
              onClick={() => setOpened(false)}
            >
              Fechar
            </Button>
          </Group>
        </form>
      </Modal>
      <Box sx={{ display: "none" }}>
        <OSReport data={data} componentRef={componentRef} />
      </Box>
      <Box sx={{ display: "none" }}>
        <GaranteeReport data={data} componentRef={componentGRef} />
      </Box>
    </>
  );
};
