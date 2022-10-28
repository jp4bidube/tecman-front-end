import * as yup from "yup";

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
});
