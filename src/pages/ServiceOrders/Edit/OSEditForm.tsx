import { InputDate } from "@/components/InputDate";
import { QuantityInput } from "@/components/QuantityInput";
import { usePermission } from "@/hooks/usePermission";
import { useEditOS } from "@/services/features/serviceOrders/hooks/useEditOS";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import { ServiceOrders, ServiceOrdersEdit } from "@/types/serviceOrders";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Group,
  Input,
  InputBase,
  Loader,
  NumberInput,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import cep from "cep-promise";
import { setHours, setMinutes, setMonth } from "date-fns";
import { FieldArray, FormikProvider, getIn, useFormik } from "formik";
import { useEffect } from "react";
import {
  TbCurrencyDollar,
  TbDeviceFloppy,
  TbPlus,
  TbTrash,
} from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { equipmentsList } from "../constants/equipaments";
import { validationSchema } from "./validationSchema";

type OSEditFormProps = {
  os: ServiceOrders;
};

export const OSEditForm = ({ os }: OSEditFormProps) => {
  const navigate = useNavigate();
  const { data: technicians, isFetching } = useTechniciansSelect();
  const mutation = useEditOS();
  const hasPermission = usePermission();

  const formik = useFormik({
    initialValues: {
      status: os?.orderServiceStatus?.id || 0,
      id: os?.id || 0,
      tecnicId: os?.tecnic?.id + "",
      serviceExecuted: os?.serviceExecuted || "",
      pieceSold: os?.pieceSold || false,
      clientPiece: os?.clientPiece || false,
      budget: os?.budget ? os?.budget : null,
      amountReceived: os?.amountReceived ? os?.amountReceived : null,
      datePayment: os.datePayment ? new Date(os.datePayment) : null,
      clientId: os?.client?.id || null,
      street: os?.street || "",
      periodAttendance: os?.periodAttendance || "",
      cep: os?.cep || "",
      number: os?.number || "",
      district: os?.district || "",
      complement: os?.complement || "",
      observacao: os?.observacao || "",
      defect: os?.defect || "",
      absence1: os.absence1 !== null ? new Date(os.absence1) : null,
      absence1Hour: os.absence1 !== null ? new Date(os.absence1) : null,
      obsAbsence: os.obsAbsence || "",
      device: {
        id: os?.equipments[0]?.id || null,
        type: os?.equipments[0]?.type || "",
        brand: os?.equipments[0]?.brand || "",
        model: os?.equipments[0]?.model || "",
        mounthsWarranty: os?.equipments[0]?.mounthsWarranty || 0,
        warrantyPeriod: os?.equipments[0]?.warrantyPeriod || null,
      },
      scheduledAttendance: os.scheduledAttendance
        ? new Date(os.scheduledAttendance)
        : null,
      hasWarranty: os?.equipments[0]?.mounthsWarranty ? "sim" : "não",
      taxVisit: os.taxVisit ? os.taxVisit! : null,
      paymentMethod: os.paymentMethod || "",
      specifications: [""],
    },
    validationSchema,
    onSubmit: async (values) => {
      const absence1 =
        values.absence1 !== null ? new Date(values.absence1!) : null;

      let payload = {
        ...values,
        tecnicId: +values.tecnicId || 0,
        budget: values.budget || 0,
        taxVisit: values.taxVisit || 0,
        amountReceived: values.amountReceived || 0,
        absence1:
          absence1 !== null
            ? setMinutes(
                setHours(values.absence1!, values.absence1Hour?.getHours()!),
                values.absence1Hour?.getMinutes()!
              )
            : null,
      } as ServiceOrdersEdit;
      delete payload.absence1Hour;
      delete payload.hasWarranty;
      delete payload.status;
      const res = await mutation.mutateAsync(payload);
      res.success && navigate(-1);
    },
  });
  const { values, errors, touched, ...action } = formik;

  const currentWarranty = getIn(values, "hasWarranty");

  const handleSearchCep = async (cepNumber: string) => {
    const { street, neighborhood } = await cep(cepNumber);
    formik.setFieldValue("street", street);
    formik.setFieldValue("district", neighborhood);
  };

  useEffect(() => {
    if (currentWarranty === "sim") {
      action.setFieldValue("device.mounthsWarranty", 1);
      action.setFieldValue(
        "device.warrantyPeriod",
        setMonth(new Date(), new Date().getMonth() + 1)
      );
    } else {
      action.setFieldValue("device.mounthsWarranty", null);
      action.setFieldValue("device.warrantyPeriod", null);
    }
  }, [currentWarranty]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={action.handleSubmit}>
        <Paper withBorder p="1.5rem" h="100%">
          <Stack style={{ overflow: "hidden" }}>
            <Grid gutter="xl" mb={8}>
              <Grid.Col span={12}>
                <Group position="apart" align="baseline">
                  <Group position="left">
                    <Title order={5}>Número OS: </Title>
                    <Badge variant="dot" size="md" color="tecman">
                      {os?.id}
                    </Badge>
                  </Group>
                  <Badge
                    size="lg"
                    color={
                      os?.orderServiceStatus?.id === 1
                        ? "orange"
                        : os?.orderServiceStatus?.id === 3
                        ? "red"
                        : "teal"
                    }
                  >
                    {os?.orderServiceStatus?.status}
                  </Badge>

                  <Group noWrap spacing="md">
                    <Button
                      radius="xl"
                      type="submit"
                      leftIcon={<TbDeviceFloppy size={20} />}
                    >
                      Salvar
                      {/* {mutation.isLoading ? <Loader size="xs" /> : "Salvar"} */}
                    </Button>
                    <Button
                      radius="xl"
                      variant="outline"
                      onClick={() => navigate(-1)}
                    >
                      Cancelar
                    </Button>
                  </Group>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
          <ScrollArea.Autosize
            maxHeight="100%"
            type="scroll"
            scrollHideDelay={100}
            scrollbarSize={8}
          >
            <Grid mb={50}>
              {/* CLIENTE */}
              <Grid.Col xs={12}>
                <Divider
                  size="xs"
                  labelPosition="left"
                  label={<Title order={5}>Informações do Cliente</Title>}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={5}>
                <TextInput
                  placeholder="Nome"
                  label="Nome"
                  variant="filled"
                  readOnly
                  value={os?.client.name}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={3}>
                <TextInput
                  placeholder="E-mail"
                  label="E-mail"
                  variant="filled"
                  readOnly
                  value={os?.client.email}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={2}>
                <InputBase
                  placeholder="CPF"
                  label="CPF"
                  component={InputMask}
                  value={os?.client.cpf}
                  variant="filled"
                  readOnly
                  mask="999.999.999-99"
                />
              </Grid.Col>
              <Grid.Col xs={12} md={2}>
                <InputBase
                  placeholder="Telefone"
                  label="Telefone"
                  component={InputMask}
                  value={os?.client?.phoneNumber}
                  variant="filled"
                  readOnly
                  mask="(99) 99999-9999"
                />
              </Grid.Col>
              <Grid.Col xs={12} md={1.5}>
                <InputBase
                  placeholder="CEP"
                  label="CEP"
                  id="cep"
                  name="cep"
                  component={InputMask}
                  mask="99.999-999"
                  onBlur={(e) => handleSearchCep(e.target.value)}
                  value={values?.cep}
                  onChange={action.handleChange}
                  error={touched.cep && errors.cep}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4.5}>
                <TextInput
                  placeholder="Endereço"
                  label="Endereço"
                  id="street"
                  name="street"
                  value={values?.street}
                  onChange={action.handleChange}
                  error={touched.street && errors.street}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col xs={12} md={2.5}>
                <TextInput
                  placeholder="Bairro"
                  label="Bairro"
                  id="district"
                  name="district"
                  value={values?.district}
                  onChange={action.handleChange}
                  error={touched.district && errors.district}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={1.5}>
                <TextInput
                  placeholder="Número"
                  label="Número"
                  id="number"
                  name="number"
                  value={values?.number}
                  onChange={action.handleChange}
                  error={touched.number && errors.number}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={2}>
                <TextInput
                  placeholder="Complemento"
                  label="Complemento"
                  id="complement"
                  name="complement"
                  value={values?.complement}
                  onChange={action.handleChange}
                  error={touched.complement && errors.complement}
                />
              </Grid.Col>
              {/* ATENDIMENTO */}
              <Grid.Col xs={12}>
                <Divider
                  size="xs"
                  labelPosition="left"
                  label={<Title order={5}>Informações do Atendimento</Title>}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <InputDate
                  placeholder="Data do atendimento"
                  label="Data do atendimento"
                  name="scheduledAttendance"
                  formik={formik}
                  value={formik.values.scheduledAttendance}
                  minDate={new Date()}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <Select
                  label="Período de atendimento"
                  placeholder="Selecione período"
                  value={formik.values.periodAttendance}
                  error={
                    formik?.touched?.periodAttendance &&
                    formik?.errors?.periodAttendance
                  }
                  onChange={(value) =>
                    formik.setFieldValue("periodAttendance", value)
                  }
                  data={[
                    { value: "Período da manhã", label: "Período da manhã" },
                    { value: "Período da tarde", label: "Período da tarde" },
                  ]}
                  searchable
                  clearable
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <TextInput
                  placeholder="Descreva observações sobre horário"
                  label="Observações"
                  name="observacao"
                  id="observacao"
                  value={formik.values.observacao}
                  onChange={formik.handleChange}
                  maxLength={25}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <Select
                  label="Técnico responsável"
                  placeholder="Selecione um técnico"
                  value={formik.values.tecnicId}
                  error={formik?.touched?.tecnicId && formik?.errors?.tecnicId}
                  onChange={(value) => formik.setFieldValue("tecnicId", value)}
                  rightSection={isFetching && <Loader size="xs" />}
                  data={technicians ? technicians : []}
                  searchable
                  clearable
                />
              </Grid.Col>
              {/* EQUIPAMENTO */}
              <Grid.Col xs={12}>
                <Divider
                  size="xs"
                  labelPosition="left"
                  label={<Title order={5}>Informações do Equipamento</Title>}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <Select
                  withAsterisk
                  label="Equipamento"
                  placeholder="Selecione um equipamento"
                  value={values?.device?.type}
                  error={touched?.device?.type && errors?.device?.type}
                  onChange={(value) =>
                    formik.setFieldValue("device.type", value)
                  }
                  data={equipmentsList}
                  clearable
                />
              </Grid.Col>
              <Grid.Col xs={6} md={4}>
                <TextInput
                  placeholder="Marca"
                  label="Marca"
                  name={"device.brand"}
                  id={"device.brand"}
                  value={values?.device?.brand}
                  error={touched?.device?.brand && errors?.device?.brand}
                  onChange={action.handleChange}
                />
              </Grid.Col>
              <Grid.Col xs={6} md={4}>
                <TextInput
                  placeholder="Modelo"
                  label="Modelo"
                  name={`device.model`}
                  id={`device.model`}
                  value={values?.device?.model}
                  error={touched?.device?.model && errors?.device?.model}
                  onChange={formik.handleChange}
                />
              </Grid.Col>
              {os.orderServiceStatus.id === 2 ? (
                <>
                  <Grid.Col xs={12} md={4}>
                    <Tooltip
                      label="Usuário não tem permissão para executar esta ação"
                      withArrow
                      color="red.4"
                      disabled={hasPermission}
                    >
                      <Select
                        variant={hasPermission ? "default" : "filled"}
                        readOnly={!hasPermission}
                        label="Garantia"
                        placeholder="Selecione garantia"
                        value={values?.hasWarranty}
                        error={touched?.hasWarranty && errors?.hasWarranty}
                        onChange={(value) =>
                          formik.setFieldValue("hasWarranty", value)
                        }
                        data={[
                          { value: "não", label: "Sem garantia" },
                          { value: "sim", label: "Com garantia" },
                        ]}
                        withAsterisk
                        clearable
                      />
                    </Tooltip>
                  </Grid.Col>
                  {values?.hasWarranty === "sim" ? (
                    <>
                      <Grid.Col xs={12} md={2}>
                        <Tooltip
                          label="Usuário não tem permissão para executar esta ação"
                          withArrow
                          color="red.4"
                          disabled={hasPermission}
                        >
                          <Input.Wrapper label="Tempo de garantia">
                            <QuantityInput
                              formik={formik}
                              objName="device"
                              name="device.mounthsWarranty"
                              dateInputName="device.warrantyPeriod"
                              disabled={hasPermission}
                            />
                          </Input.Wrapper>
                        </Tooltip>
                      </Grid.Col>
                      <Grid.Col xs={12} md={3}>
                        <DatePicker
                          placeholder="Término da garantia"
                          locale="pt-BR"
                          label="Data de término da garantia"
                          value={values?.device?.warrantyPeriod}
                          error={
                            touched?.device?.warrantyPeriod &&
                            errors?.device?.warrantyPeriod &&
                            getIn(errors, `device.warrantyPeriod`)
                          }
                          onChange={(value) =>
                            action.setFieldValue(`device.warrantyPeriod`, value)
                          }
                          disabled
                        />
                      </Grid.Col>
                    </>
                  ) : (
                    <Grid.Col xs={12} md={6}></Grid.Col>
                  )}
                </>
              ) : null}
              <Grid.Col xs={12}>
                <Textarea
                  placeholder="Descreva o defeito apresentado"
                  label="Defeito Reclamado"
                  id="defect"
                  name="defect"
                  value={values.defect}
                  onChange={action.handleChange}
                  error={touched.defect && errors.defect}
                  minRows={3}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <Divider
                  size="xs"
                  labelPosition="left"
                  label={<Title order={5}>Informações da OS</Title>}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <NumberInput
                  id="budget"
                  name="budget"
                  withAsterisk
                  label="Valor do Orçamento"
                  hideControls
                  value={values?.budget!}
                  onChange={(value) => formik.setFieldValue("budget", value)}
                  icon={<TbCurrencyDollar size={14} />}
                  parser={(value) => value!.replace(/[.](?=(\d{3}))/g, "")}
                  formatter={(value) =>
                    !Number.isNaN(parseFloat(value!))
                      ? value!.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : ""
                  }
                  decimalSeparator=","
                  precision={2}
                  error={touched?.budget && errors?.budget}
                  iconWidth={25}
                  min={0}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <NumberInput
                  id="taxVisit"
                  name="taxVisit"
                  withAsterisk
                  label="Taxa de Visita"
                  hideControls
                  value={values?.taxVisit!}
                  onChange={(value) => formik.setFieldValue("taxVisit", value)}
                  icon={<TbCurrencyDollar size={14} />}
                  parser={(value) => value!.replace(/[.](?=(\d{3}))/g, "")}
                  formatter={(value) =>
                    !Number.isNaN(parseFloat(value!))
                      ? value!.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : ""
                  }
                  decimalSeparator=","
                  precision={2}
                  error={touched?.taxVisit && errors?.taxVisit}
                  iconWidth={25}
                  min={0}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <NumberInput
                  id="amountReceived"
                  name="amountReceived"
                  withAsterisk
                  label="Valor do Recebido"
                  hideControls
                  variant={
                    os.orderServiceStatus.id === 1 ? "filled" : "default"
                  }
                  readOnly={os.orderServiceStatus.id === 1 ? true : false}
                  value={values?.amountReceived!}
                  onChange={(value) =>
                    formik.setFieldValue("amountReceived", value)
                  }
                  icon={<TbCurrencyDollar size={14} />}
                  parser={(value) => value!.replace(/[.](?=(\d{3}))/g, "")}
                  formatter={(value) =>
                    !Number.isNaN(parseFloat(value!))
                      ? value!.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : ""
                  }
                  decimalSeparator=","
                  precision={2}
                  error={touched?.amountReceived && errors?.amountReceived}
                  iconWidth={25}
                  min={0}
                />
              </Grid.Col>
              {os.orderServiceStatus.id === 2 ? (
                <>
                  <Grid.Col xs={12} md={4}>
                    <InputDate
                      placeholder="Data de Pagamento"
                      label="Data de Pagamento"
                      value={values.datePayment}
                      name="datePayment"
                      formik={formik}
                      withAsterisk
                      minDate={new Date(os.dateCreated)}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} md={4}>
                    <Select
                      label="Forma de pagamento"
                      placeholder="Selecione a forma de pagamento"
                      value={values?.paymentMethod}
                      error={touched?.paymentMethod && errors?.paymentMethod}
                      onChange={(value) =>
                        formik.setFieldValue("paymentMethod", value)
                      }
                      rightSection={isFetching && <Loader size="xs" />}
                      data={[
                        {
                          value: "Cartão de Débito",
                          label: "Cartão de Débito",
                        },
                        {
                          value: "Cartão de Crédito",
                          label: "Cartão de Crédito",
                        },
                        { value: "Pix", label: "Pix" },
                        { value: "Dinheiro", label: "Dinheiro" },
                      ]}
                      searchable
                      clearable
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} md={6}>
                    <Textarea
                      placeholder="Descreva o serviço executado"
                      label="Serviço executado"
                      name="serviceExecuted"
                      id="serviceExecuted"
                      value={values.serviceExecuted}
                      error={
                        touched?.serviceExecuted && errors?.serviceExecuted
                      }
                      onChange={action.handleChange}
                      autosize
                      minRows={6}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} md={6}>
                    <Input.Wrapper label="Histórico de Peças">
                      <Checkbox
                        label="Houve venda de peça durante a execução do serviço"
                        mt={5}
                        checked={values?.pieceSold}
                        id="pieceSold"
                        name="pieceSold"
                        onChange={action?.handleChange}
                      />
                      <Checkbox
                        label="O cliente ficou com as peças usadas?"
                        mt={15}
                        checked={values.clientPiece}
                        id="clientPiece"
                        name="clientPiece"
                        onChange={action.handleChange}
                      />
                    </Input.Wrapper>
                  </Grid.Col>
                </>
              ) : null}
              {os?.absence1 !== null ? (
                <>
                  <Grid.Col xs={12} md={4}>
                    <InputDate
                      variant="filled"
                      readOnly
                      placeholder="Ausencia"
                      label="Ausência"
                      name="absence1"
                      formik={formik}
                      value={
                        values.absence1 !== null
                          ? new Date(values.absence1)
                          : null
                      }
                      disabled={!!os?.absence1}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} md={2}>
                    <TimeInput
                      variant="filled"
                      label="Horário"
                      id="absence1Hour"
                      name="absence1Hour"
                      clearable
                      value={
                        values.absence1Hour !== null
                          ? new Date(values.absence1Hour)
                          : null
                      }
                      onChange={(value) =>
                        formik.setFieldValue("absence1Hour", value)
                      }
                      error={touched?.absence1Hour && errors?.absence1Hour}
                      disabled
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} md={6}>
                    <TextInput
                      variant="filled"
                      readOnly
                      placeholder="Quem "
                      label="Motivo do cancelamento"
                      id="obsAbsence"
                      name="obsAbsence"
                      value={values?.obsAbsence}
                      onChange={action.handleChange}
                      error={touched.obsAbsence && errors.obsAbsence}
                      withAsterisk
                    />
                  </Grid.Col>
                </>
              ) : null}

              {/* ESPECIFICAÇÕES */}
              <FieldArray
                name="specifications"
                render={(arrayHelpers) => (
                  <>
                    <Grid.Col span={12}>
                      <Divider
                        size="xs"
                        labelPosition="left"
                        label={
                          <>
                            <Title order={5}>Especificações</Title>
                            <ActionIcon<"button">
                              variant="light"
                              size={28}
                              ml={10}
                              onClick={() => arrayHelpers.push("")}
                              color="tecman"
                              disabled={values.specifications.length === 7}
                            >
                              <TbPlus size={16} />
                            </ActionIcon>
                          </>
                        }
                      />
                    </Grid.Col>
                    {formik?.values?.specifications.map((_, index) => (
                      <>
                        <Grid.Col xs={11.5}>
                          <TextInput
                            placeholder="Descreva as especificações do técnico"
                            id={`specifications.${index}`}
                            name={`specifications.${index}`}
                            value={values.specifications[index]}
                            onChange={action.handleChange}
                          />
                        </Grid.Col>
                        <Grid.Col xs={12} md={0.5}>
                          <Box mt={5}>
                            <ActionIcon
                              variant="light"
                              color="red"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <TbTrash size={20} />
                            </ActionIcon>
                          </Box>
                        </Grid.Col>
                      </>
                    ))}
                  </>
                )}
              />
            </Grid>
          </ScrollArea.Autosize>
        </Paper>
      </form>
    </FormikProvider>
  );
};
