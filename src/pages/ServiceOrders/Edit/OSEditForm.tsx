import { InputDate } from "@/components/InputDate";
import { QuantityInput } from "@/components/QuantityInput";
import { usePermission } from "@/hooks/usePermission";
import { useEditOS } from "@/services/features/serviceOrders/hooks/useEditOS";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import { ServiceOrders, ServiceOrdersEdit } from "@/types/serviceOrders";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Grid,
  Group,
  Input,
  InputBase,
  Loader,
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
import { getIn, useFormik } from "formik";
import { useEffect } from "react";
import { TbCurrencyDollar, TbDeviceFloppy } from "react-icons/tb";
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
      budget: os?.budget ?? 0,
      amountReceived: os?.amountReceived ?? 0,
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
      absence1: os.absence1 || null,
      absence1Hour: os.absence1 || null,
      absence2: os.absence2 || null,
      absence2Hour: os.absence2 || null,
      device: {
        id: os?.equipments[0]?.id || null,
        type: os?.equipments[0]?.type || "",
        brand: os?.equipments[0]?.brand || "",
        model: os?.equipments[0]?.model || "",
        mounthsWarranty: os?.equipments[0]?.mounthsWarranty || 0,
        warrantyPeriod: os?.equipments[0]?.warrantyPeriod || null,
      },
      hasWarranty: os?.equipments[0]?.mounthsWarranty ? "sim" : "não",
    },
    validationSchema,
    onSubmit: async (values) => {
      let payload = {
        ...values,
        tecnicId: +values.tecnicId || 0,
        budget: +values.budget || 0,
        amountReceived: +values.amountReceived || 0,
        absence1:
          values.absence1 !== null
            ? setMinutes(
                setHours(values.absence1!, values.absence1Hour?.getHours()!),
                values.absence1Hour?.getMinutes()!
              )
            : null,
        absence2:
          values.absence2 !== null
            ? setMinutes(
                setHours(values.absence2!, values.absence2Hour?.getHours()!),
                values.absence2Hour?.getMinutes()!
              )
            : null,
      } as ServiceOrdersEdit;
      delete payload.absence1Hour;
      delete payload.absence2Hour;
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
    <form onSubmit={action.handleSubmit}>
      <Paper withBorder p="1.5rem">
        <Stack style={{ maxHeight: "90vh", overflow: "hidden" }}>
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
                  color={os?.orderServiceStatus?.id === 1 ? "orange" : "teal"}
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
          <ScrollArea.Autosize
            maxHeight="79vh"
            type="scroll"
            scrollHideDelay={200}
            scrollbarSize={8}
          >
            <Grid>
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
                  withAsterisk
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
              <Grid.Col xs={12}>
                <Divider
                  size="xs"
                  labelPosition="left"
                  label={<Title order={5}>Informações da OS</Title>}
                />
              </Grid.Col>
              {os.orderServiceStatus.id === 2 ? (
                <>
                  <Grid.Col xs={12} md={4}>
                    <Input.Wrapper
                      label="Valor do Orçamento"
                      error={touched?.budget && errors?.budget}
                    >
                      <Input
                        type="number"
                        step=".01"
                        id="budget"
                        name="budget"
                        value={values?.budget}
                        onChange={action?.handleChange}
                        icon={<TbCurrencyDollar size={14} />}
                        invalid={
                          touched?.budget && errors?.budget ? true : false
                        }
                      />
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col xs={12} md={4}>
                    <Input.Wrapper
                      label="Valor do Recebido"
                      error={touched?.amountReceived && errors?.amountReceived}
                    >
                      <Input
                        type="number"
                        step=".01"
                        id="amountReceived"
                        name="amountReceived"
                        value={values?.amountReceived}
                        onChange={action?.handleChange}
                        icon={<TbCurrencyDollar size={14} />}
                        invalid={
                          touched?.amountReceived && errors?.amountReceived
                            ? true
                            : false
                        }
                      />
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col xs={12} md={4}>
                    <InputDate
                      placeholder="Data de Pagamento"
                      label="Data de Pagamento"
                      value={values.datePayment}
                      name="datePayment"
                      formik={formik}
                      withAsterisk
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

              <Grid.Col xs={12} md={6}>
                <Select
                  label="Técnico Responsável"
                  placeholder="Selecione um técnico"
                  value={values.tecnicId}
                  error={touched?.tecnicId && errors?.tecnicId}
                  onChange={(value) => formik.setFieldValue("tecnicId", value)}
                  rightSection={isFetching && <Loader size="xs" />}
                  data={technicians ? technicians : []}
                  withAsterisk
                  searchable
                  clearable
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <Select
                  label="Período de atendimento"
                  placeholder="Selecione período"
                  value={values.periodAttendance}
                  error={touched?.periodAttendance && errors?.periodAttendance}
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
                <InputDate
                  placeholder="Ausencia"
                  label="Ausencia"
                  name="absence1"
                  formik={formik}
                  value={values.absence1}
                  disabled={!!os?.absence1}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={2}>
                <TimeInput
                  label="Horário"
                  id="absence1Hour"
                  name="absence1Hour"
                  clearable
                  value={values.absence1Hour}
                  onChange={(value) =>
                    formik.setFieldValue("absence1Hour", value)
                  }
                  error={touched?.absence1Hour && errors?.absence1Hour}
                  disabled={!!os?.absence1}
                />
              </Grid.Col>
              {os?.absence2 ? (
                <Grid.Col xs={12} md={6}>
                  <InputDate
                    placeholder="Ausencia"
                    label="Ausencia 2"
                    value={os?.absence2}
                    name="absence2"
                    formik={formik}
                    disabled={!!os?.absence1}
                  />
                </Grid.Col>
              ) : null}
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
                  withAsterisk
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
                  withAsterisk
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
                      <Grid.Col xs={12} md={4}>
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
                      <Grid.Col xs={12} md={4}>
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

              <Grid.Col xs={12} md={6}>
                <Textarea
                  placeholder="Descreva o defeito apresentado"
                  label="Defeito Reclamado"
                  id="defect"
                  name="defect"
                  value={values.defect}
                  onChange={action.handleChange}
                  error={touched.defect && errors.defect}
                  minRows={2}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <Textarea
                  placeholder="Observações"
                  label="Observações"
                  value={values.observacao}
                  id="observacao"
                  name="observacao"
                  onChange={action.handleChange}
                  error={touched.observacao && errors.observacao}
                  minRows={2}
                />
              </Grid.Col>
            </Grid>
          </ScrollArea.Autosize>
        </Stack>
      </Paper>
    </form>
  );
};
