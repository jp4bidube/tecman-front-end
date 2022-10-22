import { useUpdateUserPassword } from "@/services/features/users/hooks/useUpdateUserPassword";
import useStore from "@/store";
import { Button, Loader, PasswordInput, Stack, Text } from "@mantine/core";
import { useFormik } from "formik";
import { validationSchemaNewPassword } from "./validationSchema";

export const CreatePasswordForm = () => {
  const mutation = useUpdateUserPassword();
  const store = useStore();
  const {
    recouverPassword: { userId, employeeId, username },
  } = store;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaNewPassword,
    onSubmit: (values) => {
      mutation.mutate({
        id: userId,
        payload: { employeeId, username, password: values.password },
      });
    },
  });
  const { values, errors, touched, ...action } = formik;

  return (
    <form onSubmit={action.handleSubmit}>
      <Stack
        px="xl"
        pb="xl"
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
          Cadastre sua nova senha
        </Text>

        <PasswordInput
          placeholder="Senha"
          label="Senha"
          name="password"
          id="password"
          value={values?.password}
          onChange={action.handleChange}
          error={touched?.password && errors?.password}
          withAsterisk
        />

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

        <Button
          type="submit"
          disabled={mutation.isLoading}
          sx={{ marginTop: "20px" }}
        >
          {mutation.isLoading ? <Loader size="sm" /> : "Criar nova senha"}
        </Button>
      </Stack>
    </form>
  );
};
