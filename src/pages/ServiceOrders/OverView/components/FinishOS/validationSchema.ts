import * as yup from "yup";

export const validationSchema = yup.object({
  amountReceived: yup.number().nullable().required("O campo é obrigatório"),
  budget: yup.number().nullable().required("O campo é obrigatório"),
  serviceExecuted: yup.string().required("O campo é obrigatório"),
  datePayment: yup.date().nullable().required("O campo é obrigatório"),
  tecnicId: yup.string().nullable().required("O campo é obrigatório"),
  equipments: yup.array().of(
    yup.object().shape({
      type: yup.string().nullable().required("O campo é obrigatório"),
      brand: yup.string().required("O campo é obrigatório"),
      model: yup.string().required("O campo é obrigatório"),
      mounthsWarranty: yup.number().required("O campo é obrigatório"),
      warrantyPeriod: yup.date().required("O campo é obrigatório"),
    })
  ),
});
