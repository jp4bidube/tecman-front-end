import * as yup from "yup";

export const validationSchema = yup.object({
  cpf: yup.string().required("O campo é obrigatório"),
  street: yup.string().required("O campo é obrigatório"),
  number: yup.string().required("O campo é obrigatório"),
  district: yup.string().required("O campo é obrigatório"),
});
