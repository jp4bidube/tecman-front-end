import { useCreateClient } from "@/services/features/clients/hooks/useCreateClient";
import { ClientCreatePayloadForm } from "@/types/clients";
import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Input,
  InputBase,
  Loader,
  Paper,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import cep from "cep-promise";
import { useFormik } from "formik";
import { useState } from "react";
import { BsBuilding, BsPersonBoundingBox } from "react-icons/bs";
import { TbDeviceFloppy } from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validationSchema";

export const ClientCreateForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateClient();
  const [createOs, setCreateOs] = useState(
    localStorage.getItem("createOs") === "true" ? true : false
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      phoneNumber1: "",
      phoneNumber2: "",
      celPhone1: "",
      celPhone2: "",
      cpf: "",
      email: "",
      address: {
        street: "",
        cep: "",
        number: "",
        district: "",
        complement: "",
        defaultAddress: true,
      },
      typePerson: "PF",
      documentIdenfication: "",
      stateRegistration: "",
      municipalRegistration: "",
    } as ClientCreatePayloadForm,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        phoneNumber:
          values.phoneNumber1! +
          "," +
          values.phoneNumber2! +
          "," +
          values.celPhone1! +
          "," +
          values.celPhone2!,
        stateRegistration: values.stateRegistration.toString(),
        municipalRegistration: values.municipalRegistration.toString(),
      };
      delete values.phoneNumber1;
      delete values.phoneNumber2;
      delete values.celPhone1;
      delete values.celPhone2;
      mutation.mutate(payload);
    },
  });
  const handleCreateOSChange = (check: boolean) => {
    localStorage.setItem("createOs", check + "");
    setCreateOs(check);
  };

  const { values, errors, touched, ...action } = formik;

  const handleSearchCep = async (cepNumber: string) => {
    const { street, neighborhood } = await cep(cepNumber);
    action.setFieldValue("address.street", street);
    action.setFieldValue("address.district", neighborhood);
  };

  return (
    <Stack>
      <form
        onSubmit={action.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <Paper withBorder sx={{ padding: "1.5rem" }}>
          <Grid gutter="xl">
            <Grid.Col span={12}>
              <Group position="apart">
                <Title order={4}>Informações básicas</Title>
                <Group align="flex-end">
                  <Switch
                    labelPosition="left"
                    checked={createOs}
                    onChange={(event) =>
                      handleCreateOSChange(event.currentTarget.checked)
                    }
                    label={
                      <Text component="label" weight={500} size="sm">
                        Criar OS ao salvar o cliente
                      </Text>
                    }
                  />
                  <Button
                    radius="xl"
                    type="submit"
                    // disabled={mutation.isLoading}
                    leftIcon={<TbDeviceFloppy size={20} />}
                  >
                    {mutation.isLoading ? <Loader size="xs" /> : "Salvar"}
                  </Button>
                  <Button
                    radius="xl"
                    variant="outline"
                    onClick={() => navigate("/clients")}
                  >
                    Cancelar
                  </Button>
                </Group>
              </Group>
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TextInput
                placeholder="Nome"
                label="Nome"
                name="name"
                id="name"
                maxLength={100}
                value={values.name}
                onChange={action.handleChange}
                error={touched.name && errors.name}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TextInput
                placeholder="E-mail"
                label="E-mail"
                name="email"
                id="email"
                maxLength={100}
                value={values.email}
                onChange={action.handleChange}
                error={touched.email && errors.email}
              />
            </Grid.Col>

            <Grid.Col xs={12} md={4} lg={3} miw={300}>
              <Input.Wrapper label="Tipo do cliente">
                <Group position="left">
                  <SegmentedControl
                    size="md"
                    color="tecman"
                    value={values.typePerson}
                    onChange={(value: "light" | "dark") =>
                      action.setFieldValue("typePerson", value)
                    }
                    data={[
                      {
                        value: "PF",
                        label: (
                          <Center>
                            <BsPersonBoundingBox
                              size={16}
                              color={
                                values.typePerson === "PF" ? "white" : "initial"
                              }
                            />
                            <Box ml={10}>
                              <Text
                                color={
                                  values.typePerson === "PF"
                                    ? "white"
                                    : "initial"
                                }
                              >
                                Pessoa Física{" "}
                              </Text>
                            </Box>
                          </Center>
                        ),
                      },
                      {
                        value: "PJ",
                        label: (
                          <Center>
                            <BsBuilding
                              size={16}
                              color={
                                values.typePerson === "PJ" ? "white" : "initial"
                              }
                            />
                            <Box ml={10}>
                              <Text
                                color={
                                  values.typePerson === "PJ"
                                    ? "white"
                                    : "initial"
                                }
                              >
                                Pessoa Jurídica
                              </Text>
                            </Box>
                          </Center>
                        ),
                      },
                    ]}
                  />
                </Group>
              </Input.Wrapper>
            </Grid.Col>
            {values.typePerson === "PF" ? (
              <>
                <Grid.Col xs={12} md={3}>
                  <InputBase
                    placeholder="Digite o Documento"
                    label="CPF"
                    name="cpf"
                    id="cpf"
                    component={InputMask}
                    value={values.cpf}
                    onChange={action.handleChange}
                    error={touched.cpf && errors.cpf}
                    maskChar=""
                    mask="999.999.999-99"
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={3}>
                  <TextInput
                    placeholder="Digite o Documento"
                    label="RG"
                    name="documentIdenfication"
                    id="documentIdenfication"
                    value={values.documentIdenfication}
                    onChange={action.handleChange}
                    maxLength={20}
                    error={
                      touched.documentIdenfication &&
                      errors.documentIdenfication
                    }
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={3}></Grid.Col>
              </>
            ) : (
              <>
                <Grid.Col xs={12} md={3}>
                  <InputBase
                    placeholder="Digite o Documento"
                    label="CNPJ"
                    name="cpf"
                    id="cpf"
                    component={InputMask}
                    value={values.cpf}
                    onChange={action.handleChange}
                    error={touched.cpf && errors.cpf}
                    maskChar=""
                    mask="99.999.999/9999-99"
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={3}>
                  <TextInput
                    type="number"
                    placeholder="Digite o Documento"
                    label="Inscrição Estadual"
                    name="stateRegistration"
                    id="stateRegistration"
                    value={values.stateRegistration}
                    onChange={action.handleChange}
                    maxLength={50}
                    error={
                      touched.stateRegistration && errors.stateRegistration
                    }
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={3}>
                  <TextInput
                    type="number"
                    placeholder="Digite o Documento"
                    label="Inscrição Municipal"
                    name="municipalRegistration"
                    id="municipalRegistration"
                    value={values.municipalRegistration}
                    onChange={action.handleChange}
                    maxLength={50}
                    error={
                      touched.municipalRegistration &&
                      errors.municipalRegistration
                    }
                  />
                </Grid.Col>
              </>
            )}
            <Grid.Col xs={12} md={3}>
              <InputBase
                placeholder="Telefone"
                label="Telefone 1"
                name="phoneNumber1"
                component={InputMask}
                id="phoneNumber1"
                value={values.phoneNumber1}
                onChange={action.handleChange}
                error={touched.phoneNumber1 && errors.phoneNumber1}
                withAsterisk
                mask="(99) 9999-9999"
              />
            </Grid.Col>
            <Grid.Col xs={12} md={3}>
              <InputBase
                placeholder="Telefone"
                label="Telefone 2"
                name="phoneNumber2"
                component={InputMask}
                id="phoneNumber2"
                value={values.phoneNumber2}
                onChange={action.handleChange}
                error={touched.phoneNumber2 && errors.phoneNumber2}
                withAsterisk
                mask="(99) 9999-9999"
              />
            </Grid.Col>
            <Grid.Col xs={12} md={3}>
              <InputBase
                placeholder="Telefone"
                label="Celular 1"
                name="celPhone1"
                component={InputMask}
                id="celPhone1"
                value={values.celPhone1}
                onChange={action.handleChange}
                error={touched.celPhone1 && errors.celPhone1}
                withAsterisk
                mask="(99) 99999-9999"
              />
            </Grid.Col>
            <Grid.Col xs={12} md={3}>
              <InputBase
                placeholder="Telefone"
                label="Celular 2"
                name="celPhone2"
                component={InputMask}
                id="celPhone2"
                value={values.celPhone2}
                onChange={action.handleChange}
                error={touched.celPhone2 && errors.celPhone2}
                withAsterisk
                mask="(99) 99999-9999"
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12}>
              <Title order={3} mt={20}>
                Endereço
              </Title>
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <InputBase
                placeholder="CEP"
                label="CEP"
                name="address.cep"
                id="address.cep"
                component={InputMask}
                value={values.address?.cep}
                onBlur={(e) => handleSearchCep(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearchCep(values.address.cep)
                }
                onChange={action.handleChange}
                error={touched.address?.cep && errors.address?.cep}
                mask="99.999-999"
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TextInput
                placeholder="Rua"
                label="Rua"
                name="address.street"
                id="address.street"
                withAsterisk
                value={values.address?.street}
                onChange={action.handleChange}
                error={touched.address?.street && errors.address?.street}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={2}>
              <TextInput
                placeholder="Número"
                label="Número"
                name="address.number"
                id="address.number"
                withAsterisk
                value={values.address?.number}
                onChange={action.handleChange}
                error={touched.address?.number && errors.address?.number}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TextInput
                placeholder="Bairro"
                label="Bairro"
                name="address.district"
                id="address.district"
                withAsterisk
                value={values.address?.district}
                onChange={action.handleChange}
                error={touched.address?.district && errors.address?.district}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TextInput
                placeholder="Complemento"
                label="Complemento"
                name="address.complement"
                id="address.complement"
                value={values.address?.complement}
                onChange={action.handleChange}
                error={
                  touched.address?.complement && errors.address?.complement
                }
              />
            </Grid.Col>
          </Grid>
        </Paper>
      </form>
    </Stack>
  );
};
