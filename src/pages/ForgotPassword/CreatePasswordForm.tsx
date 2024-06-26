import { useUpdateUserPassword } from "@/services/features/users/hooks/useUpdateUserPassword";
import useStore from "@/store";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useFormik } from "formik";
import { TbCopy } from "react-icons/tb";
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
    <form
      onSubmit={action.handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
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

        <TextInput label="Usuário" value={username} disabled />

        <PasswordInput
          placeholder="Senha"
          label="Senha"
          name="password"
          id="password"
          value={values?.password}
          onChange={action.handleChange}
          error={touched?.password && errors?.password}
        />

        <PasswordInput
          placeholder="Confirmar Senha"
          label="Confirmar Senha"
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={action.handleChange}
          error={touched.confirmPassword && errors.confirmPassword}
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
