import { useFetchClientById } from "@/services/features/clients/hooks/useFetchClientById";
import { useUpdateClient } from "@/services/features/clients/hooks/useUpdateClient";
import { ClientAddress, ClientCreatePayloadForm } from "@/types/clients";
import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Input,
  InputBase,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { BsBuilding, BsPersonBoundingBox } from "react-icons/bs";
import { TbDeviceFloppy, TbPlus } from "react-icons/tb";
import InputMask from "react-input-mask";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate, useParams } from "react-router-dom";
import { ClientAddressItem } from "./ClientAddressItem";
import { ClientEditFormSkeleton } from "./ClientEditFormSkeleton";
import { validationSchema } from "./validationSchema";

export const ClientEditForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const mutation = useUpdateClient();

  const {
    data: client,
    isFetching,
    isLoading,
  } = useFetchClientById(params.id || "");

  const formik = useFormik({
    initialValues: {
      name: client?.name || "",
      cpf: client?.cpf || "",
      email: client?.email || "",
      phoneNumber: client?.phoneNumber || "",
      phoneNumber1: client?.phoneNumber.split(",")[0] || "",
      phoneNumber2: client?.phoneNumber.split(",")[1] || "",
      celPhone1: client?.phoneNumber.split(",")[2] || "",
      celPhone2: client?.phoneNumber.split(",")[3] || "",
      typePerson: client?.typePerson || "",
      documentIdenfication: client?.documentIdenfication || "",
      stateRegistration: client?.stateRegistration || "",
      municipalRegistration: client?.municipalRegistration || "",
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
        documentIdenfication:
          values.typePerson !== "PF" ? "" : values.documentIdenfication,
        stateRegistration:
          values.typePerson !== "PJ" ? "" : values.stateRegistration.toString(),
        municipalRegistration:
          values.typePerson !== "PJ"
            ? ""
            : values.municipalRegistration.toString(),
      };
      delete values.phoneNumber1;
      delete values.phoneNumber2;
      delete values.celPhone1;
      delete values.celPhone2;
      mutation.mutate({ id: client!.id, payload });
    },
  });
  const list = client!.address.sort(
    (a, b) => Number(b.defaultAddress) - Number(a.defaultAddress)
  );

  const { values, errors, touched, ...action } = formik;
  const [clientAddress, setClientAddress] = useState(list);

  const handleAddAddress = () => {
    const address = {
      id: "",
      clientId: `${Math.random()}`,
      address: {
        id: "",
        cep: "",
        complement: "",
        street: "",
        number: "",
        district: "",
      },
      defaultAddress: false,
    } as ClientAddress;
    setClientAddress([...clientAddress, address]);
    // if (clientAddress.length < 3) {
    // }
  };
  const handleRemoveAddress = (key: string) => {
    const filteredAddress = clientAddress.filter(
      (item) => item.clientId !== key
    );
    setClientAddress(filteredAddress);
  };
  return (
    <>
      {isLoading || isFetching ? (
        <ClientEditFormSkeleton />
      ) : (
        <Stack>
          <form
            onSubmit={action.handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <Grid gutter="xl">
              <Grid.Col span={12}>
                <Group position="apart">
                  <Title order={4}>Informações básicas</Title>
                  <Group>
                    <Button
                      radius="xl"
                      type="submit"
                      leftIcon={<TbDeviceFloppy size={20} />}
                    >
                      Atualizar
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
                                  values.typePerson === "PF"
                                    ? "white"
                                    : "initial"
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
                                  values.typePerson === "PJ"
                                    ? "white"
                                    : "initial"
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
              <Grid.Col span={12} mt={20}>
                <Group>
                  <Title order={4}>Endereço</Title>
                  <Button
                    leftIcon={<TbPlus />}
                    variant="light"
                    radius="xl"
                    onClick={handleAddAddress}
                    // disabled={clientAddress.length == 3}
                  >
                    Adicionar Endereço
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </form>
          <Box sx={{ overflow: "auto", whiteSpace: "nowrap" }}>
            <PerfectScrollbar>
              {clientAddress &&
                clientAddress.map((clientAddress) => (
                  <ClientAddressItem
                    key={clientAddress.clientId}
                    id={client!.id}
                    data={clientAddress}
                    onRemoveItem={handleRemoveAddress}
                  />
                ))}
            </PerfectScrollbar>
          </Box>
        </Stack>
      )}
    </>
  );
};
