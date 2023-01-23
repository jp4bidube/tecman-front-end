import * as yup from "yup";

export const validationSchema = yup.object({
  amountReceived: yup.number().nullable().required("O campo é obrigatório"),
  budget: yup.number().nullable().required("O campo é obrigatório"),
  serviceExecuted: yup.string().required("O campo é obrigatório"),
  datePayment: yup.date().nullable().required("O campo é obrigatório"),
  tecnicId: yup.string().nullable().required("O campo é obrigatório"),
  hasWarranty: yup.string().nullable().required("O campo é obrigatório"),
  device: yup.object().shape({
    type: yup.string().nullable().required("O campo é obrigatório"),
    // brand: yup.string().required("O campo é obrigatório"),
    // model: yup.string().required("O campo é obrigatório"),
  }),
});
