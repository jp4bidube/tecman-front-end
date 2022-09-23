import { useCreateClient } from "@/services/features/clients/hooks/useCreateClient";
import { ClientCreatePayload } from "@/types/clients";
import {
  Button,
  Grid,
  Group,
  InputBase,
  Loader,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import cep from "cep-promise";
import { useFormik } from "formik";
import { TbDeviceFloppy } from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validationSchema";

export const ClientCreateForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateClient();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
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
    } as ClientCreatePayload,
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const { values, errors, touched, ...action } = formik;

  const handleSearchCep = async (cepNumber: string) => {
    const { street, neighborhood } = await cep(cepNumber);
    action.setFieldValue("address.street", street);
    action.setFieldValue("address.district", neighborhood);
  };

  return (
    <Stack>
      <form onSubmit={action.handleSubmit}>
        <Paper withBorder sx={{ padding: "1.5rem" }}>
          <Grid gutter="xl">
            <Grid.Col span={12}>
              <Group position="apart">
                <Title order={3}>Informações básicas</Title>
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
                withAsterisk
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
                withAsterisk
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
