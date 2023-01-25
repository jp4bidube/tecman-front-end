import * as yup from "yup";

export const validationSchema = yup.object({
  status: yup.number(),
  tecnicId: yup
    .string()
    .nullable()
    .when("status", (status, field) =>
      status === 2 ? field.required("O campo é obrigatório") : field
    ),
  periodAttendance: yup
    .string()
    .nullable()
    .when("status", (status, field) =>
      status === 2 ? field.required("O campo é obrigatório") : field
    ),
  device: yup.object().shape({
    type: yup.string().nullable().required("O campo é obrigatório"),
    // brand: yup.string().required("O campo é obrigatório"),
    // model: yup.string().required("O campo é obrigatório"),
  }),
  hasWarranty: yup
    .string()
    .nullable()
    .when("status", (status, field) =>
      status === 2 ? field.required("O campo é obrigatório") : field
    ),
  defect: yup
    .string()
    .when("status", (status, field) =>
      status === 2 ? field.required("O campo é obrigatório") : field
    ),
  absence1Hour: yup
    .mixed()
    .when("absence1", (absence1, field) =>
      absence1 !== null ? field.required("O campo é obrigatório") : field
    ),
  scheduledAttendance: yup.date().nullable().required("O campo é obrigatório"),
});
