import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Usuário é obrigatório"),
  cpf: yup.string().required("Usuário é obrigatório"),
  email: yup
    .string()
    .email("E-mail não é válido")
    .required("Usuário é obrigatório"),
  phoneNumber: yup.string().required("Usuário é obrigatório"),
});
