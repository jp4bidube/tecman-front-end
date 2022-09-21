import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup.string().required("Usuário é obrigatório"),
  password: yup
    .string()
    .min(3, "A senha deve conter ao menos 6 caracteres")
    .required("A senha é obrigatória"),
});
