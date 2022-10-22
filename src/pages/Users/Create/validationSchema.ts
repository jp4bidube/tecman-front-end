import * as yup from "yup";

const employeeUserSchema = yup.object().shape({
  username: yup.string().required("Usuário é obrigatório"),
  password: yup
    .string()
    .min(3, "A senha deve conter ao menos 3 caracteres")
    .required("A senha é obrigatória"),
});

export const validationSchema = yup.object({
  name: yup.string().required("O campo é obrigatório"),
  cpf: yup.string().required("O campo é obrigatório"),
  email: yup
    .string()
    .email("E-mail não é válido")
    .required("O campo é obrigatório"),
  phoneNumber: yup.string().required("O campo é obrigatório"),
  role: yup.string().required("O campo é obrigatório"),
  birthDate: yup.mixed().required("O campo é obrigatório"),
  employeeUser: yup.object().when("role", {
    is: (roleValue: string) => roleValue !== "" && roleValue !== "4",
    then: employeeUserSchema,
  }),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("employeeUser.password"), null],
      "As senhas devem corresponder"
    )
    .when("role", (role, field) =>
      role !== "" && role !== "4"
        ? field.required("A senha é obrigatória")
        : field
    ),
  address: yup.object({
    street: yup.string().required("O campo é obrigatório"),
    number: yup.string().required("O campo é obrigatório"),
    district: yup.string().required("O campo é obrigatório"),
  }),
});
