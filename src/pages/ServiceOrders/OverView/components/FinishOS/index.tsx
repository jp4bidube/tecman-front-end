import { QuantityInput } from "@/components/QuantityInput";
import { equipmentsList } from "@/pages/ServiceOrders/constants/equipaments";
import { useFinishOS } from "@/services/features/serviceOrders/hooks/useFinishOS";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import { ServiceOrderFinish, ServiceOrders } from "@/types/serviceOrders";
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Grid,
  Group,
  Input,
  Loader,
  ScrollArea,
  Select,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { setMonth } from "date-fns";
import { FormikProvider, getIn, useFormik } from "formik";
import { useEffect } from "react";
import { TbCurrencyDollar, TbDeviceFloppy } from "react-icons/tb";
import { validationSchema } from "./validationSchema";

type FinishOSFormProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
  os: ServiceOrders;
};

export const FinishOSForm = ({ opened, setOpened, os }: FinishOSFormProps) => {
  const theme = useMantineTheme();
  const mutation = useFinishOS();
  const { data, isFetching } = useTechniciansSelect();
  console.log(os);
  const formik = useFormik({
    initialValues: {
      tecnicId: os.tecnic.id || "",
      amountReceived: os.amountReceived ? os.amountReceived! : null,
      budget: os.budget ? os.budget : null,
      clientPiece: os.clientPiece ? os.clientPiece : false,
      pieceSold: os.pieceSold ? os.pieceSold : false,
      serviceExecuted: os.serviceExecuted ? os.serviceExecuted : "",
      datePayment: os.datePayment ? os.datePayment : null,
      equipments: os.equipments,
      hasWarranty: "",
    } as Omit<ServiceOrderFinish, "id">,
    validationSchema,
    onSubmit: async (values) => {
      let payload = { ...values };
      delete payload.hasWarranty;

      const res = await mutation.mutateAsync({ id: os.id, payload });
      if (res) {
        setOpened(false);
      }
    },
  });
  const { values, errors, touched, ...action } = formik;
  const currentWarranty = getIn(values, "hasWarranty");

  useEffect(() => {
    if (currentWarranty === "sim") {
      action.setFieldValue("equipments.0.mounthsWarranty", 1);
      action.setFieldValue(
        "equipments.0.warrantyPeriod",
        setMonth(new Date(), new Date().getMonth() + 1)
      );
    } else {
      action.setFieldValue("equipments.0.mounthsWarranty", null);
      action.setFieldValue("equipments.0.warrantyPeriod", null);
    }
  }, [currentWarranty]);
  console.log(errors);
  return (
    <Drawer
      opened={opened}
      closeOnEscape={false}
      withCloseButton={false}
      closeOnClickOutside={false}
      onClose={() => {}}
      position="right"
      title={<Title>Finalizar Ordem de Serviço</Title>}
      padding="xl"
      size="70%"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <FormikProvider value={formik}>
        <form onSubmit={action?.handleSubmit}>
          <Grid>
            <Grid.Col span={12}>
              <Group position="right">
                <Button
                  radius="xl"
                  type="submit"
                  leftIcon={<TbDeviceFloppy size={20} />}
                >
                  Salvar
                </Button>
                <Button
                  radius="xl"
                  variant="outline"
                  onClick={() => setOpened(false)}
                >
                  Cancelar
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
          <ScrollArea.Autosize
            maxHeight="79vh"
            type="scroll"
            scrollbarSize={8}
            scrollHideDelay={150}
          >
            <Grid mt={10}>
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
                    invalid={touched?.budget && errors?.budget ? true : false}
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
                <DatePicker
                  placeholder="Data de Pagamento"
                  locale="pt-BR"
                  label="Data de Pagamento"
                  allowFreeInput
                  value={values?.datePayment}
                  error={
                    touched?.datePayment &&
                    errors?.datePayment &&
                    getIn(errors, `datePayment`)
                  }
                  onChange={(value) =>
                    action.setFieldValue(`datePayment`, value)
                  }
                />
              </Grid.Col>

              <Grid.Col xs={12} md={12}>
                <Textarea
                  placeholder="Descreva o serviço executado"
                  label="Serviço executado"
                  name="serviceExecuted"
                  id="serviceExecuted"
                  value={values.serviceExecuted}
                  error={touched?.serviceExecuted && errors?.serviceExecuted}
                  onChange={action.handleChange}
                  autosize
                  minRows={6}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <Select
                  label="Técnico Responsável"
                  placeholder="Selecione um técnico"
                  value={values?.tecnicId}
                  error={touched?.tecnicId && errors?.tecnicId}
                  onChange={(value) => formik.setFieldValue("tecnicId", value)}
                  rightSection={isFetching && <Loader size="xs" />}
                  data={data ? data : []}
                  withAsterisk
                  searchable
                  clearable
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}></Grid.Col>
              <Grid.Col xs={12} md={4}>
                <Input.Wrapper label="Venda de Peças">
                  <Checkbox
                    label="Houve venda de peça durante a execução do serviço"
                    mt={5}
                    checked={values?.pieceSold}
                    id="pieceSold"
                    name="pieceSold"
                    onChange={action?.handleChange}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <Input.Wrapper label="Historico de Peças">
                  <Checkbox
                    label="O cliente ficou com as peças usadas?"
                    mt={5}
                    checked={values.clientPiece}
                    id="clientPiece"
                    name="clientPiece"
                    onChange={action.handleChange}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col xs={12} md={4}></Grid.Col>
              <Grid.Col span={12} my={20}>
                <Divider />
              </Grid.Col>
              {values?.equipments?.length > 0 &&
                values?.equipments?.map((equip, index) => (
                  <>
                    <Grid.Col xs={12} md={4}>
                      <Select
                        withAsterisk
                        label="Equipamento"
                        placeholder="Selecione um equipamento"
                        value={values?.equipments[index]?.type}
                        error={
                          touched?.equipments &&
                          touched?.equipments[index]?.type &&
                          errors?.equipments &&
                          getIn(errors, `equipments.${index}.type`)
                        }
                        onChange={(value) =>
                          formik.setFieldValue(
                            `equipments.${index}.type`,
                            value
                          )
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
                        name={`equipments.${index}.brand`}
                        id={`equipments.${index}.brand`}
                        value={values?.equipments[index]?.brand}
                        error={
                          touched?.equipments &&
                          touched?.equipments[index]?.brand &&
                          errors?.equipments &&
                          getIn(errors, `equipments.${index}.brand`)
                        }
                        onChange={action.handleChange}
                      />
                    </Grid.Col>
                    <Grid.Col xs={6} md={4}>
                      <TextInput
                        withAsterisk
                        placeholder="Modelo"
                        label="Modelo"
                        name={`equipments.${index}.model`}
                        id={`equipments.${index}.model`}
                        value={values?.equipments[index]?.model}
                        error={
                          touched?.equipments &&
                          touched?.equipments[index]?.model &&
                          errors?.equipments &&
                          getIn(errors, `equipments.${index}.model`)
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid.Col>
                    <Grid.Col xs={12} md={4}>
                      <Select
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
                    </Grid.Col>
                    {currentWarranty === "sim" ? (
                      <>
                        <Grid.Col xs={12} md={4}>
                          <Input.Wrapper label="Tempo de garantia">
                            <QuantityInput formik={formik} index={index} />
                          </Input.Wrapper>
                        </Grid.Col>
                        <Grid.Col xs={12} md={4}>
                          <DatePicker
                            placeholder="Término da garantia"
                            locale="pt-BR"
                            label="Data de término da garantia"
                            value={values?.equipments[index]?.warrantyPeriod}
                            error={
                              touched?.equipments &&
                              touched?.equipments[index]?.warrantyPeriod &&
                              errors?.equipments &&
                              getIn(
                                errors,
                                `equipments.${index}.warrantyPeriod`
                              )
                            }
                            onChange={(value) =>
                              action.setFieldValue(
                                `equipments.${index}.warrantyPeriod`,
                                value
                              )
                            }
                            disabled
                          />
                        </Grid.Col>
                      </>
                    ) : null}
                  </>
                ))}
            </Grid>
          </ScrollArea.Autosize>
        </form>
      </FormikProvider>
    </Drawer>
  );
};
