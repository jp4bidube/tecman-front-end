import * as yup from "yup";

const employeeUserSchema = yup.object().shape({
  username: yup.string().required("Usuário é obrigatório"),
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
});

export const validationCredentialsSchema = yup.object({
  username: yup.string().required("Usuário é obrigatório"),
  password: yup
    .string()
    .min(3, "A senha deve conter ao menos 3 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder")
    .required("A confirmação de senha é obrigatória"),
});
