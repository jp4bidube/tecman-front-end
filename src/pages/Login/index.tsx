import logo from "@/assets/logo.webp";
import { useIsAuth } from "@/hooks/useAuth";
import { useSignIn } from "@/services/features/auth/hooks/SignIn";
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useFormik } from "formik";
import { TbEye, TbEyeOff, TbLock, TbUserCircle } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import { validationSchema } from "./validationSchema";

export const Login = () => {
  const isAuth = useIsAuth();
  const mutation = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
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
          <Center>
            <Image
              src={logo}
              alt="Logo"
              sx={{ maxWidth: 200, minWidth: 100, marginTop: "2rem" }}
            />
          </Center>

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
              <PasswordInput
                placeholder="Senha"
                label="Senha"
                name="password"
                id="password"
                value={values.password}
                onChange={action.handleChange}
                error={touched.password && errors.password}
                withAsterisk
                icon={<TbLock size={14} />}
                visibilityToggleIcon={({ reveal, size }) =>
                  reveal ? <TbEyeOff size={size} /> : <TbEye size={size} />
                }
              />
              <Group position="right" mb={10}>
                <Link to="/forgot-password">
                  <Anchor>
                    <Text size="xs" weight={500}>
                      Esqueceu a senha?
                    </Text>
                  </Anchor>
                </Link>
              </Group>
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
