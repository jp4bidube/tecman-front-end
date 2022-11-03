import { Client, ClientAddress } from "@/types/clients";
import {
  Box,
  Button,
  Grid,
  Group,
  InputBase,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { TbDeviceFloppy, TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ClientAddressItem } from "./ClientAddressItem";
import { validationSchema } from "./validationSchema";
import PerfectScrollbar from "react-perfect-scrollbar";
import InputMask from "react-input-mask";
import { useUpdateClient } from "@/services/features/clients/hooks/useUpdateClient";

type ClientEditFormProps = {
  client: Client;
};

export const ClientEditForm = ({ client }: ClientEditFormProps) => {
  const navigate = useNavigate();
  const mutation = useUpdateClient();

  const formik = useFormik({
    initialValues: {
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phoneNumber: client.phoneNumber,
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({ id: client.id, payload: values });
    },
  });
  const list = client.address.sort(
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
              <Title order={3}>Informações básicas</Title>
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
              value={values.email}
              onChange={action.handleChange}
              error={touched.email && errors.email}
            />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <InputBase
              placeholder="CPF"
              label="CPF"
              name="cpf"
              id="cpf"
              component={InputMask}
              value={values.cpf}
              onChange={action.handleChange}
              error={touched.cpf && errors.cpf}
              mask="999.999.999-99"
            />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <InputBase
              placeholder="Telefone"
              label="Telefone"
              name="phoneNumber"
              component={InputMask}
              id="phoneNumber"
              value={values.phoneNumber}
              onChange={action.handleChange}
              error={touched.phoneNumber && errors.phoneNumber}
              withAsterisk
              mask="(99) 99999-9999"
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12} mt={20}>
            <Group>
              <Title order={3}>Endereço</Title>
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
                id={client.id}
                data={clientAddress}
                onRemoveItem={handleRemoveAddress}
              />
            ))}
        </PerfectScrollbar>
      </Box>
    </Stack>
  );
};
