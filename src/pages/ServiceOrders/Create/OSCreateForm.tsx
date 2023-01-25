import { InputDate } from "@/components/InputDate";
import { useCreateClient } from "@/services/features/clients/hooks/useCreateClient";
import { useFetchClientByCPF } from "@/services/features/clients/hooks/useFetchClientByCPF";
import { useFetchClientById } from "@/services/features/clients/hooks/useFetchClientById";
import { useCreateOS } from "@/services/features/serviceOrders/hooks/useCreateOS";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import { Client } from "@/types/clients";
import {
  Button,
  Grid,
  Group,
  InputBase,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import cep from "cep-promise";
import { FormikProvider, getIn, useFormik } from "formik";
import { useEffect, useState } from "react";
import { TbArrowUpRight, TbDeviceFloppy, TbSearch } from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate, useParams } from "react-router-dom";
import { ClientAddressList } from "../components/ClientAddressList";
import { equipmentsList } from "../constants/equipaments";
import { ClientSection } from "./components/ClientSection";
import { ClientsList } from "./components/ClientsList";
import { validationSchema } from "./validationSchema";

type Equipment = {
  type: string;
  brand: string;
  model: string;
};

export const OSCreateForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateClient();
  const params = useParams();

  const { data: clienteData } = useFetchClientById(params.id || "");

  const [openChangeAddress, setOpenChangeAddress] = useState(false);
  const [lockAdress, setLockAdress] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [opened, setOpened] = useState(false);

  const clientMutation = useFetchClientByCPF();
  const createOSMutation = useCreateOS();
  const { data, isFetching } = useTechniciansSelect();

  useEffect(() => {
    if (clienteData) {
      setClient(clienteData);
      formik.setValues({
        cpf: clienteData?.cpf || "",
        street: clienteData?.address[0]?.address?.street || "",
        cep: clienteData?.address[0]?.address?.cep || "",
        number: clienteData?.address[0]?.address?.number || "",
        district: clienteData?.address[0]?.address?.district || "",
        complement: clienteData?.address[0]?.address?.complement || "",
        tecnicId: "",
        periodAttendance: "",
        defect: "",
        observacao: "",
        devices: [{ type: "", brand: "", model: "" }] as Array<Equipment>,
        scheduledAttendance: new Date(),
      });
    }
  }, [clienteData]);

  const formik = useFormik({
    initialValues: {
      cpf: "",
      street: "",
      cep: "",
      number: "",
      district: "",
      complement: "",
      tecnicId: "",
      periodAttendance: "",
      defect: "",
      observacao: "",
      devices: [{ type: "", brand: "", model: "" }] as Array<Equipment>,
      scheduledAttendance: new Date(),
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
                  <Title order={4}>Informações do Cliente</Title>
                  <Group>
                    <Button
                      radius="xl"
                      leftIcon={<TbSearch size={20} />}
                      disabled={clientMutation.isLoading}
                      onClick={() => setOpened(true)}
                    >
                      {mutation.isLoading ? (
                        <Loader size="xs" />
                      ) : (
                        "Buscar cliente"
                      )}
                    </Button>
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
              scrollbarSize={8}
              scrollHideDelay={150}
            >
              <Grid>
                {/* <Grid.Col xs={12} md={4}>
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
                </Grid.Col> */}
                {/* <Grid.Col xs={12} md={8}>
                  <Box mt="1.5rem">
                    
                  </Box>
                </Grid.Col> */}
                {client && (
                  <Grid.Col span={12}>
                    <ClientSection
                      name={client.name}
                      email={client.email}
                      phone={client.phoneNumber}
                      document={client.cpf}
                    />
                  </Grid.Col>
                )}

                <Grid.Col span={12}>
                  <Group position="left" mt={20}>
                    <Title order={4}>Endereço</Title>
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
                    variant={lockAdress ? "filled" : "default"}
                    readOnly={lockAdress}
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
                    variant={lockAdress ? "filled" : "default"}
                    readOnly={lockAdress}
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
                    variant={lockAdress ? "filled" : "default"}
                    readOnly={lockAdress}
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
                    variant={lockAdress ? "filled" : "default"}
                    readOnly={lockAdress}
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
                    variant={lockAdress ? "filled" : "default"}
                    readOnly={lockAdress}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={12}>
                  <Group position="left" mt={20}>
                    <Title order={4}>Atendimento</Title>
                  </Group>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <Select
                    label="Técnico responsável"
                    placeholder="Selecione um técnico"
                    value={formik.values.tecnicId}
                    error={
                      formik?.touched?.tecnicId && formik?.errors?.tecnicId
                    }
                    onChange={(value) =>
                      formik.setFieldValue("tecnicId", value)
                    }
                    rightSection={isFetching && <Loader size="xs" />}
                    data={data ? data : []}
                    searchable
                    clearable
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
                  <InputDate
                    placeholder="Data do atendimento"
                    label="Data do atendimento"
                    name="scheduledAttendance"
                    formik={formik}
                    value={formik.values.scheduledAttendance}
                    minDate={new Date()}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Title order={4}>Detalhes do equipamento</Title>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <Select
                    withAsterisk
                    label="Equipamento"
                    placeholder="Selecione um equipamento"
                    value={formik.values.devices[0].type}
                    error={
                      formik?.touched?.devices &&
                      formik?.touched?.devices[0]?.type &&
                      formik?.errors?.devices &&
                      getIn(formik?.errors, `devices.0.type`)
                    }
                    onChange={(value) =>
                      formik.setFieldValue(`devices.0.type`, value)
                    }
                    data={equipmentsList}
                    searchable
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <TextInput
                    placeholder="Marca"
                    label="Marca"
                    name={`devices.0.brand`}
                    id={`devices.0.brand`}
                    value={formik.values.devices[0]?.brand}
                    error={
                      formik?.touched?.devices &&
                      formik?.touched?.devices[0]?.brand &&
                      formik?.errors?.devices &&
                      getIn(formik.errors, `devices.0.brand`)
                    }
                    onChange={formik.handleChange}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <TextInput
                    placeholder="Modelo"
                    label="Modelo"
                    name={`devices.0.model`}
                    id={`devices.0.model`}
                    value={formik.values.devices[0].model}
                    error={
                      formik?.touched?.devices &&
                      formik?.touched?.devices[0]?.model &&
                      formik?.errors?.devices &&
                      getIn(formik?.errors, `devices.0.model`)
                    }
                    onChange={formik.handleChange}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
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
                <Grid.Col xs={12} md={6}>
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

      <Modal
        centered
        size={900}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Buscar Client"
      >
        <ClientsList setOpened={setOpened} />
      </Modal>
    </Stack>
  );
};
