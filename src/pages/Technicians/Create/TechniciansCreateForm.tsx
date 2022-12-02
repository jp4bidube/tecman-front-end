import { InputDate } from "@/components/InputDate";
import { useCreateTechnicians } from "@/services/features/technicians/hooks/useCreateTechnicians";
import { toBase64 } from "@/utils/fileToB64";
import {
  Avatar,
  Button,
  Divider,
  FileButton,
  Grid,
  Group,
  InputBase,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import cep from "cep-promise";
import "dayjs/locale/pt-BR";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TbDeviceFloppy, TbUpload } from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validationSchema";

export const TechniciansCreateForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateTechnicians();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      cpf: "",
      email: "",
      avatarUrl: "",
      birthDate: null,
      role: 4,
      address: {
        street: "",
        cep: "",
        number: "",
        district: "",
        complement: "",
      },
      employeeUser: {
        login: false,
        username: "",
        password: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      let payload = { ...values };
      mutation.mutate(payload);
    },
  });

  const { values, errors, touched, ...action } = formik;
  const [avatar, setAvatar] = useState<File | null>(null);

  const changeImg = async () => {
    if (avatar) {
      const b64 = await toBase64(avatar);
      formik.setFieldValue("avatarUrl", b64);
    }
  };

  const handleSearchCep = async (cepNumber: string) => {
    const { street, neighborhood } = await cep(cepNumber);
    action.setFieldValue("address.street", street);
    action.setFieldValue("address.district", neighborhood);
  };

  useEffect(() => {
    changeImg();
  }, [avatar, changeImg]);

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
                <Group>
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
                    onClick={() => navigate("/technicians")}
                  >
                    Cancelar
                  </Button>
                </Group>
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group>
                <Avatar
                  color="cyan"
                  radius="xl"
                  size="lg"
                  src={values.avatarUrl}
                >
                  {values.name?.toUpperCase().substring(0, 2)}
                </Avatar>
                <div>
                  <Title order={5}>Foto de perfil</Title>
                  <Text size="xs" color="dimmed" lineClamp={1}>
                    Somente png, jpeg e jpg são permitidos como foto de perfil.
                  </Text>
                </div>
                <FileButton onChange={setAvatar} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button
                      {...props}
                      size="xs"
                      variant="light"
                      radius="xl"
                      leftIcon={<TbUpload size={15} />}
                    >
                      Enviar Imagem
                    </Button>
                  )}
                </FileButton>
              </Group>
              <Divider mt={15} />
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
            <Grid.Col xs={12} md={6}>
              <InputDate
                placeholder="Data de nascimento"
                label="Data de Nascimento"
                value={values.birthDate}
                name="birthDate"
                formik={formik}
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
                withAsterisk
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
                withAsterisk
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
                withAsterisk
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
