import { toBase64 } from "@/utils/fileToB64";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  FileButton,
  Grid,
  Group,
  InputBase,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getIn, useFormik } from "formik";
import { useEffect, useState } from "react";
import { TbDeviceFloppy, TbUpload } from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import cep from "cep-promise";
import { validationSchema } from "./validationSchema";
import { useCreateUser } from "@/services/features/users/hooks/useCreateUser";
import "dayjs/locale/pt-BR";
import { DatePicker } from "@mantine/dates";

export const TechniciansCreateForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateUser();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      cpf: "",
      email: "",
      avatar_url: "",
      birthDate: null,
      role: "",
      address: {
        street: "",
        cep: "",
        number: "",
        district: "",
        complement: "",
      },
      employeeUser: {
        login: true,
        username: "",
        password: "",
      },
      confirmPassword: "" || undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      let payload = { ...values };
      delete payload.confirmPassword;
      mutation.mutate({ ...payload, role: +payload.role });
    },
  });

  const { values, errors, touched, ...action } = formik;
  const currentRole = getIn(values, "role");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showUserCredentials, setShowUserCredentials] = useState(false);

  const changeImg = async () => {
    if (avatar) {
      const b64 = await toBase64(avatar);
      formik.setFieldValue("avatar_url", b64);
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

  useEffect(() => {
    if (currentRole !== "" && currentRole !== "4") {
      action.setFieldValue("employeeUser.login", true);
      setShowUserCredentials(true);
    } else {
      action.setFieldValue("employeeUser.login", false);
      setShowUserCredentials(false);
    }
  }, [currentRole]);

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
                    leftIcon={<TbDeviceFloppy size={20} />}
                  >
                    Salvar
                  </Button>
                  <Button
                    radius="xl"
                    variant="outline"
                    onClick={() => navigate("/users")}
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
                  src={values.avatar_url}
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
            <Grid.Col xs={12} md={6}>
              <Select
                label="Tipo de Perfil"
                placeholder="selecione um Perfil"
                value={values.role}
                onChange={(value) => action.setFieldValue("role", value)}
                error={touched.role && errors.role}
                withAsterisk
                data={[
                  { value: "1", label: "Administrador" },
                  { value: "2", label: "Balconista" },
                  { value: "3", label: "Gerência" },
                  { value: "4", label: "Técnicos" },
                ]}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <DatePicker
                placeholder="Data de nascimento"
                locale="pt-BR"
                label="Data de Nascimento"
                allowFreeInput
                value={values.birthDate}
                error={touched.birthDate && errors.birthDate}
                onChange={(value) => action.setFieldValue("birthDate", value)}
                withAsterisk
              />
            </Grid.Col>
          </Grid>
          <Collapse in={showUserCredentials}>
            <Grid>
              <Grid.Col span={12}>
                <Title order={3} mt={20}>
                  Credenciais de usuário
                </Title>
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <TextInput
                  placeholder="Nome de usuário"
                  label="Nome de usuário"
                  name="employeeUser.username"
                  id="employeeUser.username"
                  value={values.employeeUser?.username}
                  onChange={action.handleChange}
                  error={
                    touched.employeeUser?.username &&
                    errors.employeeUser?.username
                  }
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <PasswordInput
                  placeholder="Senha"
                  label="Senha"
                  name="employeeUser.password"
                  id="employeeUser.password"
                  value={values.employeeUser?.password}
                  onChange={action.handleChange}
                  error={
                    touched.employeeUser?.password &&
                    errors.employeeUser?.password
                  }
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <PasswordInput
                  placeholder="Confirmar Senha"
                  label="Confirmar Senha"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={action.handleChange}
                  error={touched.confirmPassword && errors.confirmPassword}
                  withAsterisk
                />
              </Grid.Col>
            </Grid>
          </Collapse>
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
