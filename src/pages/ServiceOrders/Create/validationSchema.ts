import * as yup from "yup";

export const validationSchema = yup.object({
  //cpf: yup.string().required("O campo é obrigatório"),
  street: yup.string().required("O campo é obrigatório"),
  number: yup.string().required("O campo é obrigatório"),
  district: yup.string().required("O campo é obrigatório"),
  defect: yup.string().required("O campo é obrigatório"),
  // tecnicId: yup.string().nullable().required("O campo é obrigatório"),
  //periodAttendance: yup.string().nullable().required("O campo é obrigatório"),
  scheduledAttendance: yup.date().nullable().required("O campo é obrigatório"),
  devices: yup.array().of(
    yup.object().shape({
      type: yup.string().required("O campo é obrigatório"),
      // brand: yup.string().required("O campo é obrigatório"),
      // model: yup.string().required("O campo é obrigatório"),
    })
  ),
});
