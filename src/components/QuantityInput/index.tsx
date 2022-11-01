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
  index: number;
  formik: any;
}

export function QuantityInput({
  min = 1,
  max = 24,
  formik,
  index,
}: QuantityInputProps) {
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);

  const handleIncrement = () => {
    formik.setFieldValue(
      `equipments.${index}.mounthsWarranty`,
      formik.values?.equipments[index]?.mounthsWarranty + 1
    );
    formik.setFieldValue(
      `equipments.${index}.warrantyPeriod`,
      setMonth(
        formik.values?.equipments[index]?.warrantyPeriod,
        formik.values?.equipments[index]?.warrantyPeriod.getMonth() + 1
      )
    );
  };

  const handleDecrement = () => {
    formik.setFieldValue(
      `equipments.${index}.mounthsWarranty`,
      formik.values?.equipments[index]?.mounthsWarranty - 1
    );
    formik.setFieldValue(
      `equipments.${index}.warrantyPeriod`,
      setMonth(
        formik.values?.equipments[index]?.warrantyPeriod,
        formik.values?.equipments[index]?.warrantyPeriod.getMonth() - 1
      )
    );
  };

  const manageMonths = (increment: boolean, numOfMonths: number) => {
    return setMonth(
      new Date(),
      increment
        ? new Date().getMonth() + numOfMonths
        : new Date().getMonth() - numOfMonths
    );
  };

  return (
    <div className={classes.wrapper}>
      <ActionIcon<"button">
        size={28}
        variant="filled"
        color="tecman"
        onClick={handleDecrement}
        disabled={formik.values?.equipments[index]?.mounthsWarranty <= min}
        onMouseDown={(event) => event.preventDefault()}
      >
        <TbMinus size={16} />
      </ActionIcon>
      <Text size="sm">
        <NumberInput
          variant="unstyled"
          min={min}
          max={max}
          value={Number.parseInt(
            formik.values?.equipments[index]?.mounthsWarranty!
          )}
          handlersRef={handlers}
          onChange={formik.handleChange}
          hidden
        />
        {formik.values?.equipments[index]?.mounthsWarranty! < 2
          ? `${formik.values?.equipments[index]?.mounthsWarranty!} mês`
          : `${formik.values?.equipments[index]?.mounthsWarranty!} meses`}
      </Text>
      <ActionIcon<"button">
        size={28}
        onClick={handleIncrement}
        disabled={formik.values?.equipments[index]?.mounthsWarranty === max}
        onMouseDown={(event) => event.preventDefault()}
        variant="filled"
        color="tecman"
      >
        <TbPlus size={16} />
      </ActionIcon>
    </div>
  );
}
