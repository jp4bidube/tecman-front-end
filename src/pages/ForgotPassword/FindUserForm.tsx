import { useRecouverPassword } from "@/services/features/users/hooks/useRecouverPassword";
import { Button, InputBase, Loader, Stack, Text } from "@mantine/core";
import { useFormik } from "formik";
import ReactInputMask from "react-input-mask";
import { validationSchema } from "./validationSchema";
export const FindUserForm = () => {
  const mutation = useRecouverPassword();

  const formik = useFormik({
    initialValues: {
      cpf: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values.cpf);
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
          Para renovar a senha é necessário inserir CPF para criar uma nova
          senha.
        </Text>

        <InputBase
          placeholder="CPF"
          label="CPF"
          name="cpf"
          id="cpf"
          component={ReactInputMask}
          value={values.cpf}
          onChange={action.handleChange}
          error={touched.cpf && errors.cpf}
          withAsterisk
          mask="999.999.999-99"
        />

        <Button
          type="submit"
          disabled={mutation.isLoading}
          sx={{ marginTop: "20px" }}
        >
          {mutation.isLoading ? <Loader size="sm" /> : "Entrar"}
        </Button>
      </Stack>
    </form>
  );
};
