import { useCreateClient } from "@/services/features/clients/hooks/useCreateClient";
import { useFetchClientByCPF } from "@/services/features/clients/hooks/useFetchClientByCPF";
import { Client } from "@/types/clients";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  InputBase,
  Loader,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import cep from "cep-promise";
import { FieldArray, FormikProvider, useFormik } from "formik";
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
import { ClientAddressList } from "../components/ClientAddressList";
import { equipmentsList } from "../constants/equipaments";
import { validationSchema } from "./validationSchema";

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

  const formik = useFormik({
    initialValues: {
      cpf: "",
      street: "",
      cep: "",
      number: "",
      district: "",
      complement: "",
      equipments: [{ type: "", brand: "", model: "" }] as Array<Equipment>,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
    <Stack>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Paper withBorder sx={{ padding: "1.5rem" }}>
            <Grid gutter="xl">
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
            </Grid>
            <Grid>
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
                  error={formik.touched.complement && formik.errors.complement}
                  disabled={lockAdress}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <FieldArray
                name="equipments"
                render={(arrayHelpers) => (
                  <>
                    <Grid.Col span={12}>
                      <Group position="left" mt={20}>
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
                    {formik.values.equipments.map((_, index) => (
                      <>
                        <Grid.Col xs={12} md={4}>
                          <Select
                            label="Equipamento"
                            placeholder="selecione um equipamento"
                            value={formik.values.equipments[index].type}
                            onChange={(value) =>
                              formik.setFieldValue(
                                `equipments.${index}.type`,
                                value
                              )
                            }
                            data={equipmentsList}
                          />
                        </Grid.Col>
                        <Grid.Col xs={12} md={4}>
                          <TextInput
                            placeholder="Marca"
                            label="Marca"
                            name={`equipments.${index}.brand`}
                            id={`equipments.${index}.brand`}
                            value={formik.values.equipments[index].brand}
                            onChange={formik.handleChange}
                          />
                        </Grid.Col>
                        <Grid.Col
                          xs={12}
                          md={
                            index !== 0 && formik.values.equipments.length > 1
                              ? 3.5
                              : 4
                          }
                        >
                          <TextInput
                            placeholder="Modelo"
                            label="Modelo"
                            name={`equipments.${index}.model`}
                            id={`equipments.${index}.model`}
                            value={formik.values.equipments[index].model}
                            onChange={formik.handleChange}
                          />
                        </Grid.Col>
                        {index !== 0 && formik.values.equipments.length > 1 && (
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
            </Grid>
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
