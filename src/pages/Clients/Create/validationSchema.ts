import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Usuário é obrigatório"),
  // cpf: yup.string().required("Usuário é obrigatório"),
  // email: yup
  //   .string()
  //   .email("E-mail não é válido")
  //   .required("Usuário é obrigatório"),
  //phoneNumber: yup.string().required("Usuário é obrigatório"),
  phoneNumber1: yup
    .string()
    .test(
      "oneOfRequired",
      "Pelo menos dos telefones deve ser inserido",
      function (item) {
        return (
          this.parent.phoneNumber1 ||
          this.parent.phoneNumber2 ||
          this.parent.celPhone1 ||
          this.parent.celPhone2
        );
      }
    ),
  phoneNumber2: yup
    .string()
    .test(
      "oneOfRequired",
      "Pelo menos dos telefones deve ser inserido",
      function (item) {
        return (
          this.parent.phoneNumber1 ||
          this.parent.phoneNumber2 ||
          this.parent.celPhone1 ||
          this.parent.celPhone2
        );
      }
    ),
  celPhone1: yup
    .string()
    .test(
      "oneOfRequired",
      "Pelo menos dos telefones deve ser inserido",
      function (item) {
        return (
          this.parent.phoneNumber1 ||
          this.parent.phoneNumber2 ||
          this.parent.celPhone1 ||
          this.parent.celPhone2
        );
      }
    ),
  celPhone2: yup
    .string()
    .test(
      "oneOfRequired",
      "Pelo menos dos telefones deve ser inserido",
      function (item) {
        return (
          this.parent.phoneNumber1 ||
          this.parent.phoneNumber2 ||
          this.parent.celPhone1 ||
          this.parent.celPhone2
        );
      }
    ),
  address: yup.object({
    street: yup.string().required("O campo é obrigatório"),
    number: yup.string().required("O campo é obrigatório"),
    district: yup.string().required("O campo é obrigatório"),
  }),
});
