import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Usuário é obrigatório"),
  // cpf: yup.string().required("Usuário é obrigatório"),
  // email: yup
  //   .string()
  //   .email("E-mail não é válido")
  //   .required("Usuário é obrigatório"),
  phoneNumber: yup.string().required("Usuário é obrigatório"),
  address: yup.object({
    street: yup.string().required("O campo é obrigatório"),
    number: yup.string().required("O campo é obrigatório"),
    district: yup.string().required("O campo é obrigatório"),
  }),
});
