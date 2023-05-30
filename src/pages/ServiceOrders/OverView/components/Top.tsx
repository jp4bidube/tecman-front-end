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
  Flex,
  Grid,
  Group,
  Menu,
  Modal,
  Text,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import {
  TbAd2,
  TbArrowLeft,
  TbChevronDown,
  TbEdit,
  TbExclamationMark,
  TbPrinter,
  TbUserExclamation,
} from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { absenceValidationSchema } from "../validationSchema";
import { GaranteeReport } from "./GaranteeReport";
import { OSReport } from "./OSReport";
import { openConfirmModal } from "@mantine/modals";
import { useMarkASPrintedOS } from "@/services/features/serviceOrders/hooks/useMarkASPrintedOS";
import { checkStatusColor } from "@/utils/checkStatus";

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
  const mutationPrinted = useMarkASPrintedOS();

  const print = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => openConfirmPrintModal(),
  });
  const handlePrint = () => {
    if (data.printed) {
      return openPrintConfirmation();
    }
    print();
  };

  const handlePrintGarantee = useReactToPrint({
    content: () => componentGRef.current,
  });

  const openConfirmPrintModal = () => {
    openConfirmModal({
      title: <Title order={4}>Confirmação de impressão</Title>,
      centered: true,
      children: (
        <Text size="sm">
          Por favor confirme se a impressão foi realizada com sucesso.
        </Text>
      ),
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      confirmProps: {
        color: "primary",
        radius: "xl",
        variant: "outline",
      },
      cancelProps: { radius: "xl" },
      onConfirm: () => mutationPrinted.mutate(data.id),
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };
  const openPrintConfirmation = () => {
    openConfirmModal({
      title: (
        <Title order={4}>
          Confirmação de impressão
          <TbExclamationMark size={18} color="orange" />
        </Title>
      ),
      centered: true,
      children: (
        <Text size="sm">
          Essa Ordem de serviço ja foi impressa, deseja imprimir novamente?
        </Text>
      ),
      labels: { confirm: "Continuar", cancel: "Cancelar" },
      confirmProps: {
        color: "orange.5",
        radius: "xl",
        variant: "outline",
      },
      cancelProps: { radius: "xl" },
      onConfirm: () => print(),
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };

  interface IForm {
    date: Date;
    hours?: Date | null;
    obs: string;
  }

  const formik = useFormik({
    initialValues: {
      date: new Date(),
      hours: null,
      obs: "",
    } as IForm,
    validationSchema: absenceValidationSchema,
    onSubmit: (values) => {
      const hour = values.hours?.getHours();
      const minute = values.hours?.getMinutes();
      const mergedDate = values.date;
      mergedDate.setHours(hour!);
      mergedDate.setMinutes(minute!);
      mergedDate.setSeconds(0);
      let payload = {
        ...values,
        date: mergedDate,
      };
      delete payload.hours;
      console.log(payload);
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
              color={checkStatusColor(data?.orderServiceStatus?.id)}
            >
              <Flex gap={4} align="center">
                {data?.orderServiceStatus?.status}
                {data?.printed && (
                  <Tooltip label="OS impressa" withArrow>
                    <TbPrinter size={18} />
                  </Tooltip>
                )}
              </Flex>
            </Badge>

            <Group noWrap spacing={0}>
              {data.orderServiceStatus.id === 1 ||
              data.orderServiceStatus.id === 4 ? (
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
                  {data.orderServiceStatus.id === 1 ||
                  data.orderServiceStatus.id === 4 ? (
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
                  {data.orderServiceStatus.id === 1 ||
                  data.orderServiceStatus.id === 4 ? (
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
        title={<Title order={4}>Cancelar OS</Title>}
      >
        <form onSubmit={actions.handleSubmit}>
          <Grid mb={20}>
            <Grid.Col xs={12} md={6}>
              <InputDate
                readOnly
                placeholder="Data"
                label="Data"
                name="date"
                formik={formik}
                value={values.date}
                withAsterisk
                minDate={new Date()}
                // maxDate={new Date(data.scheduledAttendance!)}
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
              <Textarea
                placeholder="Digite quem informou a ausência"
                label="Motivo do Cancelamento"
                id="obs"
                name="obs"
                value={values?.obs}
                onChange={actions.handleChange}
                error={touched.obs && errors.obs}
                withAsterisk
                minRows={3}
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
