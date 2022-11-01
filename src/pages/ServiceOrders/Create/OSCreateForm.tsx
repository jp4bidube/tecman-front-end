import { useMemo } from "react";
import { useCreateClient } from "@/services/features/clients/hooks/useCreateClient";
import { useFetchClientByCPF } from "@/services/features/clients/hooks/useFetchClientByCPF";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import { Client } from "@/types/clients";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  InputBase,
  Loader,
  Paper,
  ScrollArea,
  Select,
  SelectItem,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import cep from "cep-promise";
import { FieldArray, FormikProvider, useFormik, getIn } from "formik";
import { useState } from "react";
import {
  TbArrowUpRight,
  TbDeviceFloppy,
  TbPlus,
  TbTrash,
  TbUserCircle,
} from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { equipmentsList } from "../constants/equipaments";
import { validationSchema } from "./validationSchema";
import { useCreateOS } from "@/services/features/serviceOrders/hooks/useCreateOS";
import { ClientAddressList } from "../components/ClientAddressList";

type Equipment = {
  type: string;
  brand: string;
  model: string;
};

export const OSCreateForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateClient();
  const [openChangeAddress, setOpenChangeAddress] = useState(false);
  const [lockAdress, setLockAdress] = useState(true);
  const [client, setClient] = useState<Client | null>(null);

  const clientMutation = useFetchClientByCPF();
  const createOSMutation = useCreateOS();
  const { data, isFetching } = useTechniciansSelect();

  const formik = useFormik({
    initialValues: {
      cpf: "",
      street: "",
      cep: "",
      number: "",
      district: "",
      complement: "",
      tecnicId: "",
      defect: "",
      observacao: "",
      devices: [{ type: "", brand: "", model: "" }] as Array<Equipment>,
    },
    validationSchema,
    onSubmit: (values) => {
      let payload = {
        ...values,
        tecnicId: +values.tecnicId,
        clientId: client?.id!,
      };
      createOSMutation.mutate(payload);
    },
  });

  const handleSearchCep = async (cepNumber: string) => {
    const { street, neighborhood } = await cep(cepNumber);
    formik.setFieldValue("street", street);
    formik.setFieldValue("district", neighborhood);
  };

  const handleFetchClient = async () => {
    if (!formik.values.cpf) {
      return formik.setFieldTouched("cpf", true, true);
    }
    const client = await clientMutation.mutateAsync(formik.values.cpf);
    setClient(client);
    const clientAddress = client.address.find(
      (address) => address.defaultAddress
    );
    formik.setFieldValue("cep", clientAddress?.address.cep);
    formik.setFieldValue("street", clientAddress?.address.street);
    formik.setFieldValue("number", clientAddress?.address.number);
    formik.setFieldValue("district", clientAddress?.address.district);
    formik.setFieldValue("complement", clientAddress?.address.complement);
    return setLockAdress(true);
  };

  const handleChangeAdress = (id: string) => {
    if (id === "other") {
      formik.setFieldValue("cep", "");
      formik.setFieldValue("street", "");
      formik.setFieldValue("number", "");
      formik.setFieldValue("district", "");
      formik.setFieldValue("complement", "");
      return setLockAdress(false);
    }
    const changedAdress = client?.address.find((address) => address.id === id);
    formik.setFieldValue("cep", changedAdress?.address.cep);
    formik.setFieldValue("street", changedAdress?.address.street);
    formik.setFieldValue("number", changedAdress?.address.number);
    formik.setFieldValue("district", changedAdress?.address.district);
    formik.setFieldValue("complement", changedAdress?.address.complement);
    return setLockAdress(true);
  };

  return (
    <Stack style={{ maxHeight: "90vh", overflow: "hidden" }}>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <Paper withBorder p="1.5rem">
            <Grid gutter="xl" mb={16}>
              <Grid.Col span={12}>
                <Group position="apart">
                  <Title order={3}>Informações do Cliente</Title>
                  <Group>
                    <Button
                      radius="xl"
                      type="submit"
                      disabled={mutation.isLoading}
                      leftIcon={<TbDeviceFloppy size={20} />}
                    >
                      {mutation.isLoading ? <Loader size="xs" /> : "Salvar"}
                    </Button>
                    <Button
                      radius="xl"
                      variant="outline"
                      onClick={() => navigate("/service-orders")}
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
              scrollbarSize={8}
              scrollHideDelay={150}
            >
              <Grid>
                <Grid.Col xs={12} md={4}>
                  <InputBase
                    placeholder="CPF"
                    label="CPF do Cliente"
                    name="cpf"
                    id="cpf"
                    component={InputMask}
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                    error={formik.touched.cpf && formik.errors.cpf}
                    withAsterisk
                    icon={<TbUserCircle size={14} />}
                    mask="999.999.999-99"
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={8}>
                  <Box mt="1.5rem">
                    <Button
                      radius="xl"
                      disabled={clientMutation.isLoading}
                      onClick={handleFetchClient}
                    >
                      {mutation.isLoading ? (
                        <Loader size="xs" />
                      ) : (
                        "Buscar cliente"
                      )}
                    </Button>
                  </Box>
                </Grid.Col>
                {client && (
                  <Grid.Col span={12}>
                    <Group>
                      <ThemeIcon variant="light">
                        <TbUserCircle size={14} />
                      </ThemeIcon>
                      <Title order={5}>Cliente</Title>
                      <Text size="sm">
                        {client?.name}{" "}
                        <Text
                          sx={(theme) => ({
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.gray[4]
                                : theme.colors.gray[7],
                          })}
                          component="span"
                          weight="bold"
                        >
                          - {client?.phoneNumber}
                        </Text>
                      </Text>
                    </Group>
                  </Grid.Col>
                )}

                <Grid.Col span={12}>
                  <Group position="left" mt={20}>
                    <Title order={3}>Endereço</Title>
                    {client && (
                      <Group>
                        <Button
                          variant="light"
                          radius="xl"
                          leftIcon={<TbArrowUpRight size={20} />}
                          onClick={() => setOpenChangeAddress(true)}
                        >
                          Alterar endereço
                        </Button>
                      </Group>
                    )}
                  </Group>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <InputBase
                    placeholder="CEP"
                    label="CEP"
                    name="cep"
                    id="cep"
                    component={InputMask}
                    value={formik.values.cep}
                    onBlur={(e) => handleSearchCep(e.target.value)}
                    onChange={formik.handleChange}
                    error={formik.touched.cep && formik.errors.cep}
                    mask="99.999-999"
                    disabled={lockAdress}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                  <TextInput
                    placeholder="Rua"
                    label="Rua"
                    name="street"
                    id="street"
                    withAsterisk
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.touched.street && formik.errors.street}
                    disabled={lockAdress}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={2}>
                  <TextInput
                    placeholder="Número"
                    label="Número"
                    name="number"
                    id="number"
                    withAsterisk
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && formik.errors.number}
                    disabled={lockAdress}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                  <TextInput
                    placeholder="Bairro"
                    label="Bairro"
                    name="district"
                    id="district"
                    withAsterisk
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    error={formik.touched.district && formik.errors.district}
                    disabled={lockAdress}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                  <TextInput
                    placeholder="Complemento"
                    label="Complemento"
                    name="complement"
                    id="complement"
                    value={formik.values.complement}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.complement && formik.errors.complement
                    }
                    disabled={lockAdress}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={12}>
                  <Group position="left" mt={20}>
                    <Title order={3}>Técnico</Title>
                  </Group>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <Select
                    label="Selecione um técnico"
                    placeholder="selecione um técnico"
                    value={formik.values.tecnicId}
                    error={
                      formik?.touched?.tecnicId && formik?.errors?.tecnicId
                    }
                    onChange={(value) =>
                      formik.setFieldValue("tecnicId", value)
                    }
                    rightSection={isFetching && <Loader size="xs" />}
                    data={data ? data : []}
                    withAsterisk
                    searchable
                    clearable
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <FieldArray
                  name="devices"
                  render={(arrayHelpers) => (
                    <>
                      <Grid.Col span={12}>
                        <Group position="left" mt={25}>
                          <Title order={3}>Detalhes do equipamento</Title>
                          <Group>
                            <Button
                              variant="light"
                              radius="xl"
                              leftIcon={<TbPlus size={20} />}
                              onClick={() =>
                                arrayHelpers.push({
                                  type: "",
                                  brand: "",
                                  model: "",
                                })
                              }
                            >
                              Adicionar
                            </Button>
                          </Group>
                        </Group>
                      </Grid.Col>
                      {formik.values.devices.map((_, index) => (
                        <>
                          <Grid.Col xs={12} md={4}>
                            <Select
                              withAsterisk
                              label="Equipamento"
                              placeholder="selecione um equipamento"
                              value={formik.values.devices[index].type}
                              error={
                                formik?.touched?.devices &&
                                formik?.touched?.devices[index]?.type &&
                                formik?.errors?.devices &&
                                getIn(formik?.errors, `devices.${index}.type`)
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  `devices.${index}.type`,
                                  value
                                )
                              }
                              data={equipmentsList}
                              searchable
                            />
                          </Grid.Col>
                          <Grid.Col xs={12} md={4}>
                            <TextInput
                              withAsterisk
                              placeholder="Marca"
                              label="Marca"
                              name={`devices.${index}.brand`}
                              id={`devices.${index}.brand`}
                              value={formik.values.devices[index]?.brand}
                              error={
                                formik?.touched?.devices &&
                                formik?.touched?.devices[index]?.brand &&
                                formik?.errors?.devices &&
                                getIn(formik.errors, `devices.${index}.brand`)
                              }
                              onChange={formik.handleChange}
                            />
                          </Grid.Col>
                          <Grid.Col
                            xs={12}
                            md={
                              index !== 0 && formik.values.devices.length > 1
                                ? 3.5
                                : 4
                            }
                          >
                            <TextInput
                              withAsterisk
                              placeholder="Modelo"
                              label="Modelo"
                              name={`devices.${index}.model`}
                              id={`devices.${index}.model`}
                              value={formik.values.devices[index].model}
                              error={
                                formik?.touched?.devices &&
                                formik?.touched?.devices[index]?.model &&
                                formik?.errors?.devices &&
                                getIn(formik?.errors, `devices.${index}.model`)
                              }
                              onChange={formik.handleChange}
                            />
                          </Grid.Col>
                          {index !== 0 && formik.values.devices.length > 1 && (
                            <Grid.Col xs={12} md={0.5}>
                              <Box mt={28}>
                                <ActionIcon
                                  variant="light"
                                  color="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <TbTrash size={20} />
                                </ActionIcon>
                              </Box>
                            </Grid.Col>
                          )}
                        </>
                      ))}
                    </>
                  )}
                />
                <Grid.Col span={6}>
                  <Textarea
                    placeholder="Descreva o defeito apresentado"
                    label="Defeito"
                    name="defect"
                    id="defect"
                    value={formik.values.defect}
                    onChange={formik.handleChange}
                    error={formik.touched.defect && formik.errors.defect}
                    withAsterisk
                    autosize
                    minRows={2}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Textarea
                    placeholder="Observações"
                    label="Observações"
                    name="observacao"
                    id="observacao"
                    value={formik.values.observacao}
                    onChange={formik.handleChange}
                    autosize
                    minRows={2}
                  />
                </Grid.Col>
              </Grid>
            </ScrollArea.Autosize>
          </Paper>
        </form>
      </FormikProvider>
      <ClientAddressList
        opened={openChangeAddress}
        setOpened={setOpenChangeAddress}
        adresses={client?.address}
        onChange={handleChangeAdress}
      />
    </Stack>
  );
};
