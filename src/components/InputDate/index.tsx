import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { TbCalendar } from "react-icons/tb";
dayjs.extend(customParseFormat);

interface InputDateProps extends DatePickerProps {
  name: string;
  value: Date | null;
  formik: any;
}
const maskDate = (value: string) => {
  let dataString = value?.split("/");
  /* Define a data com os valores separados */
  return new Date(+dataString[2], +dataString[1] - 1, +dataString[0]);
};

export const InputDate = ({
  label,
  formik,
  name,
  placeholder,
  value,
  ...rest
}: InputDateProps) => {
  return (
    <DatePicker
      placeholder={placeholder}
      label={label}
      locale="pt-BR"
      allowFreeInput
      value={value}
      inputFormat="DD/MM/YYYY"
      {...rest}
      dateParser={(dateString) =>
        dateString !== "" || dateString !== null
          ? new Date(
              maskDate(
                dateString
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "$1/$2")
                  .replace(/(\d{2})(\d)/, "$1/$2")
                  .replace(/(\d{4})(\d)/, "$1")
              )
            )
          : new Date()
      }
      onChange={(value) => formik.setFieldValue(name, value)}
      error={formik.touched[name] && formik.errors[name]}
      icon={<TbCalendar size={16} />}
    ></DatePicker>
  );
};
