import { useIsAuth } from "@/hooks/useAuth";
import { useSignIn } from "@/services/features/auth/hooks/SignIn";
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { TbArrowLeft, TbLock, TbUserCircle } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";

export const ForgotPassword = () => {
  const isAuth = useIsAuth();
  const mutation = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: "",
      cpf: "",
    },
    onSubmit: (values) => {
      // mutation.mutate(values);
    },
  });
  const { values, errors, touched, ...action } = formik;

  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <Center
        sx={{
          height: "100vh",
          "@media (max-width: 755px)": {
            margin: "0px",
          },
        }}
      >
        <Paper
          shadow="md"
          p="xs"
          withBorder
          sx={{
            width: "45%",
            "@media (max-width: 755px)": {
              width: "100%",
            },
          }}
        >
          <Group pl="lg" mt={20}>
            <Link to="login">
              <Button
                variant="white"
                leftIcon={<TbArrowLeft size={25} />}
              ></Button>
            </Link>
            <Center>
              <Title order={2}>Esqueceu a senha</Title>
            </Center>
          </Group>

          <form onSubmit={action.handleSubmit}>
            <Stack
              p="xl"
              sx={{
                "@media (max-width: 1200px)": {
                  width: "100%",
                },
                "@media (max-width: 755px)": {
                  width: "100%",
                },
              }}
            >
              <Text size="sm" color="dimmed">
                Para renovar a senha é necessário inserir CPF e nome de usuário
                para criar uma nova senha.
              </Text>
              <TextInput
                placeholder="Usuário"
                label="Usuário"
                name="username"
                id="username"
                value={values.username}
                onChange={action.handleChange}
                error={touched.username && errors.username}
                icon={<TbUserCircle size={14} />}
                withAsterisk
              />
              <TextInput
                placeholder="CPF"
                label="CPF"
                name="cpf"
                id="cpf"
                value={values.cpf}
                onChange={action.handleChange}
                error={touched.cpf && errors.cpf}
                withAsterisk
                icon={<TbLock size={14} />}
              />

              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? <Loader size="sm" /> : "Entrar"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Container>
  );
};
