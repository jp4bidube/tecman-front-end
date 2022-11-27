import { useIsAuth } from "@/hooks/useAuth";
import useStore from "@/store";
import {
  Button,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import { CreatePasswordForm } from "./CreatePasswordForm";
import { FindUserForm } from "./FindUserForm";
export const ForgotPassword = () => {
  const isAuth = useIsAuth();

  const store = useStore();

  useEffect(() => {
    store.setRecouverPassword({
      employeeId: 0,
      userId: 0,
      username: "",
      recoveryToken: "",
    });
  }, []);

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
            <Title order={2}>Esqueceu a senha</Title>
          </Group>
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
            {store.recouverPassword.userId !== 0 ? (
              <CreatePasswordForm />
            ) : (
              <FindUserForm />
            )}
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
};
