import * as yup from "yup";

export const validationSchema = yup.object({
  dateVisit: yup.mixed().nullable().required("O campo é obrigatório"),
  serviceExecuted: yup.string().required("O campo é obrigatório"),
});
