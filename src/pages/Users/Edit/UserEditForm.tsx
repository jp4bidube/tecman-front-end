import { InputDate } from "@/components/InputDate";
import { useUpdateUser } from "@/services/features/users/hooks/useUpdateUser";
import { EditUserPayload, User } from "@/types/user";
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
  Overlay,
  Paper,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import cep from "cep-promise";
import { getIn, useFormik } from "formik";
import { useEffect, useState } from "react";
import { TbDeviceFloppy, TbUpload } from "react-icons/tb";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { CreateUserCredentials } from "./CreateUserCredentials";
import { validationSchema } from "./validationSchema";

type UserEditProps = {
  user: User;
};

export const UserEditForm = ({ user }: UserEditProps) => {
  const navigate = useNavigate();
  const mutation = useUpdateUser();

  const initialValue = {
    ...user,
    role: user?.role?.id + "",
    employeeUser: {
      login: user.user ? true : false,
      username: user.user ? user.user.username : "",
    },
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      const payload: EditUserPayload = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        cpf: values.cpf,
        email: values.email,
        avatarUrl: values.avatarUrl,
        birthDate: values.birthDate,
        role: +values.role,
        address: {
          street: values?.address?.street,
          cep: values?.address?.cep,
          number: values?.address?.number,
          district: values?.address?.district,
          complement: values?.address?.complement,
        },
        employeeUser: values.employeeUser,
      };
      mutation.mutate({ id: user.id, payload });
    },
  });
  const { values, errors, touched, ...action } = formik;
  const currentRole = getIn(values, "role");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showUserCredentials, setShowUserCredentials] = useState(false);
  const [showCreateUserCredentials, setShowCreateUserCredentials] =
    useState(false);

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

  useEffect(() => {
    if (!user.user && user.role.id === 4 && currentRole !== "4") {
      setShowCreateUserCredentials(true);
    } else {
      if (currentRole !== "" && currentRole !== "4") {
        action.setFieldValue("employeeUser.login", true);
        setShowUserCredentials(true);
      } else {
        action.setFieldValue("employeeUser.login", false);
        setShowUserCredentials(false);
      }
    }
  }, [currentRole]);

  const handleCancelCredentials = () => {
    action.setFieldValue("role", user.role.id + "");
    setShowCreateUserCredentials(false);
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
          <Grid gutter="xl" sx={{ position: "relative" }}>
            {showCreateUserCredentials && <Overlay blur={2} color="dark" />}
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
                maxLength={150}
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
                maxLength={150}
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
                ]}
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <InputDate
                placeholder="Data de nascimento"
                label="Data de Nascimento"
                maxLength={100}
                value={values.birthDate}
                name="birthDate"
                formik={formik}
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
            </Grid>
          </Collapse>
          {showCreateUserCredentials && (
            <Space h={300} sx={{ position: "relative" }} />
          )}
          <Grid sx={{ position: "relative" }}>
            {showCreateUserCredentials && <Overlay blur={2} color="dark" />}
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
      {showCreateUserCredentials && (
        <CreateUserCredentials
          open={showCreateUserCredentials}
          employeeId={user.id}
          onCancel={handleCancelCredentials}
          role={parseInt(currentRole)}
        />
      )}
    </Stack>
  );
};
