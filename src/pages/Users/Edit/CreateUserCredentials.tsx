import { useCreateUserCredentials } from "@/services/features/users/hooks/useCreateUserCredentials";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  Group,
  Loader,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { TbAlertCircle, TbDeviceFloppy } from "react-icons/tb";
import { validationCredentialsSchema } from "./validationSchema";

type CreateUserCredentialsProps = {
  employeeId: number;
  open: boolean;
  onCancel: () => void;
  role: number;
};

export const CreateUserCredentials = ({
  open,
  employeeId,
  onCancel,
  role,
}: CreateUserCredentialsProps) => {
  const mutation = useCreateUserCredentials();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "" || undefined,
      employeeId: employeeId,
    },
    validationSchema: validationCredentialsSchema,
    onSubmit: (values) => {
      const payload = { ...values, role };
      delete payload.confirmPassword;

      mutation.mutate(payload);
    },
  });

  const { values, errors, touched, ...action } = formik;

  return (
    <Box sx={{ position: "relative" }}>
      <Collapse
        in={open}
        sx={{
          zIndex: 999,
          padding: "1.8rem",
          position: "absolute",
          bottom: 230,
        }}
      >
        <form onSubmit={action.handleSubmit}>
          <Grid>
            <Grid.Col span={12}>
              <Title order={3} mt={20}>
                Cadastrar credenciais de usuário
              </Title>
            </Grid.Col>
            <Grid.Col span={12}>
              <Alert
                icon={<TbAlertCircle size={16} />}
                title="Aviso!"
                color="yellow"
              >
                Something terrible happened! You made a mistake and there is no
                going back, your data was lost forever!
              </Alert>
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <TextInput
                placeholder="Nome de usuário"
                label="Nome de usuário"
                name="username"
                id="username"
                value={values.username}
                onChange={action.handleChange}
                error={touched.username && errors.username}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <PasswordInput
                placeholder="Senha"
                label="Senha"
                name="password"
                id="password"
                value={values.password}
                onChange={action.handleChange}
                error={touched.password && errors.password}
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
            <Grid.Col xs={12}>
              <Group>
                <Button
                  disabled={mutation.isLoading}
                  radius="xl"
                  leftIcon={<TbDeviceFloppy size={20} />}
                  type="submit"
                >
                  {mutation.isLoading ? <Loader size="sm" /> : "Salvar"}
                </Button>
                <Button
                  radius="xl"
                  variant="outline"
                  onClick={onCancel}
                  disabled={mutation.isLoading}
                >
                  Cancelar
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Collapse>
    </Box>
  );
};
