import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("O campo é obrigatório"),
  phoneNumber: yup.string().required("O campo é obrigatório"),
  role: yup.string().required("O campo é obrigatório"),
  birthDate: yup.mixed().required("O campo é obrigatório"),
  address: yup.object({
    street: yup.string().required("O campo é obrigatório"),
    number: yup.string().required("O campo é obrigatório"),
    district: yup.string().required("O campo é obrigatório"),
  }),
});
