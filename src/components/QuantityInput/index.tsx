import {
  ActionIcon,
  createStyles,
  NumberInput,
  NumberInputHandlers,
  Text,
} from "@mantine/core";
import { setMonth } from "date-fns";
import { useRef, useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `3px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },
  input: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1,
  },
}));

interface QuantityInputProps {
  min?: number;
  max?: number;
  formik: any;
  name: string;
  dateInputName: string;
  objName: string;
  disabled?: boolean;
}

export function QuantityInput({
  min = 1,
  max = 24,
  formik,
  name,
  objName,
  dateInputName,
  disabled = false,
}: QuantityInputProps) {
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);

  const handleIncrement = () => {
    formik.setFieldValue(name, formik.values?.[objName]?.mounthsWarranty + 1);
    formik.setFieldValue(
      dateInputName,
      setMonth(
        formik.values?.[objName]?.warrantyPeriod,
        formik.values?.[objName]?.warrantyPeriod.getMonth() + 1
      )
    );
  };

  const handleDecrement = () => {
    formik.setFieldValue(name, formik.values?.[objName]?.mounthsWarranty - 1);
    formik.setFieldValue(
      dateInputName,
      setMonth(
        formik.values?.[objName]?.warrantyPeriod,
        formik.values?.[objName]?.warrantyPeriod.getMonth() - 1
      )
    );
  };

  return (
    <div className={classes.wrapper}>
      <ActionIcon<"button">
        size={28}
        onClick={handleDecrement}
        disabled={!disabled || formik.values?.[objName]?.mounthsWarranty <= min}
        onMouseDown={(event) => event.preventDefault()}
      >
        <TbMinus size={16} />
      </ActionIcon>
      <Text size="sm">
        <NumberInput
          variant="unstyled"
          min={min}
          max={max}
          value={Number.parseInt(formik.values?.[objName]?.mounthsWarranty!)}
          handlersRef={handlers}
          onChange={formik.handleChange}
          hidden
          disabled={!disabled}
        />
        {formik.values?.[objName]?.mounthsWarranty! < 2
          ? `${formik.values?.[objName]?.mounthsWarranty!} mês`
          : `${formik.values?.[objName]?.mounthsWarranty!} meses`}
      </Text>
      <ActionIcon<"button">
        size={28}
        onClick={handleIncrement}
        disabled={
          !disabled || formik.values?.[objName]?.mounthsWarranty === max
        }
        onMouseDown={(event) => event.preventDefault()}
      >
        <TbPlus size={16} />
      </ActionIcon>
    </div>
  );
}
