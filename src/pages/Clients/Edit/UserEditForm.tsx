import { useEffect } from "react";
import { User } from "@/types/user";
import { toBase64 } from "@/utils/fileToB64";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  FileButton,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getIn, useFormik } from "formik";
import { useState } from "react";
import { TbDeviceFloppy, TbUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validationSchema";

type UserEditProps = {
  user: User;
};

export const UserEditForm = ({ user }: UserEditProps) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { ...user, role: user.role.id + "" } || ({} as User),
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/users");
    },
  });

  const { values, errors, touched, ...action } = formik;
  const currentRole = getIn(values, "role");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showUserCredentials, setShowUserCredentials] = useState(false);

  const changeImg = async () => {
    if (avatar) {
      const b64 = await toBase64(avatar);
      formik.setFieldValue("avatarUrl", b64);
    }
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
                  <Button radius="xl" leftIcon={<TbDeviceFloppy size={20} />}>
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
                  {values.name.toUpperCase().substring(0, 2)}
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
              <TextInput
                placeholder="CPF"
                label="CPF"
                name="cpf"
                id="cpf"
                value={values.cpf}
                onChange={action.handleChange}
                error={touched.cpf && errors.cpf}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <TextInput
                placeholder="Telefone"
                label="Telefone"
                name="phoneNumber"
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={action.handleChange}
                error={touched.phoneNumber && errors.phoneNumber}
                withAsterisk
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
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={action.handleChange}
                  error={touched.name && errors.name}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <TextInput
                  placeholder="Senha"
                  label="Senha"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={action.handleChange}
                  error={touched.name && errors.name}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <TextInput
                  placeholder="Confirmar Senha"
                  label="Confirmar Senha"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={action.handleChange}
                  error={touched.name && errors.name}
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
              <TextInput
                placeholder="CEP"
                label="CEP"
                name="address.cep"
                id="address.cep"
                value={values.address?.cep}
                onChange={action.handleChange}
                error={touched.address?.cep && errors.address?.cep}
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
                withAsterisk
              />
            </Grid.Col>
          </Grid>
        </Paper>
      </form>
    </Stack>
  );
};
