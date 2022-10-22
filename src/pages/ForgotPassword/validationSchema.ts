import * as yup from "yup";

export const validationSchema = yup.object({
  cpf: yup.string().required("O campo é obrigatório"),
});

export const validationSchemaNewPassword = yup.object({
  password: yup
    .string()
    .min(3, "A senha deve conter ao menos 3 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder"),
});
