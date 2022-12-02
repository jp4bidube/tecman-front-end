import { InputDate } from "@/components/InputDate";
import { useCreateWarranty } from "@/services/features/serviceOrders/hooks/useCreateWarranty";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import { ServiceOrders } from "@/types/serviceOrders";
import {
  Button,
  Checkbox,
  Drawer,
  Flex,
  Grid,
  Input,
  Loader,
  Select,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useFormik } from "formik";
import { TbDeviceFloppy } from "react-icons/tb";
import { validationSchema } from "./validationSchema";

type CreateVisitProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
  serviceOrder: ServiceOrders;
};

export const CreateVisit = ({
  opened,
  setOpened,
  serviceOrder,
}: CreateVisitProps) => {
  const theme = useMantineTheme();
  const { data, isFetching } = useTechniciansSelect();
  const mutation = useCreateWarranty();

  const initialValues = {
    clientePiece: false,
    dateVisit: new Date(),
    serviceExecuted: "",
    equipmentId: serviceOrder.equipments[0].id || 0,
    employeeId: serviceOrder.tecnic.id + "" || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await mutation.mutateAsync({
        ...values,
        employeeId: +values.employeeId,
      });
      if (res.success) {
        setOpened(false);
      }
    },
  });
  const { values, errors, touched, ...action } = formik;

  return (
    <Drawer
      opened={opened}
      closeOnEscape={false}
      withCloseButton={false}
      closeOnClickOutside={false}
      onClose={() => {}}
      position="right"
      title={<Title order={4}>Criar visita de garantia</Title>}
      padding="xl"
      size="30%"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <form onSubmit={action.handleSubmit}>
        <Grid>
          <Grid.Col>
            <InputDate
              label="Data da visita"
              formik={formik}
              name="dateVisit"
              value={values.dateVisit}
            />
          </Grid.Col>
          <Grid.Col>
            <Input.Wrapper label="Historico de Peças">
              <Checkbox
                label="O cliente ficou com as peças usadas?"
                mt={5}
                id="clientePiece"
                name="clientePiece"
                onChange={action.handleChange}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Select
              label="Técnico Responsável"
              placeholder="Selecione um técnico"
              value={values?.employeeId}
              error={touched?.employeeId && errors?.employeeId}
              onChange={(value) => formik.setFieldValue("employeeId", value)}
              rightSection={isFetching && <Loader size="xs" />}
              data={data ? data : []}
              withAsterisk
              searchable
              clearable
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Textarea
              placeholder="Descreva o serviço executado"
              label="Serviço executado"
              name="serviceExecuted"
              id="serviceExecuted"
              value={values.serviceExecuted}
              error={touched.serviceExecuted && errors.serviceExecuted}
              onChange={action.handleChange}
              autosize
              minRows={6}
            />
          </Grid.Col>
          <Grid.Col mt={20}>
            <Flex>
              <Button
                leftIcon={<TbDeviceFloppy size={20} />}
                radius="xl"
                type="submit"
                loading={mutation.isLoading}
              >
                Salvar
              </Button>
              <Button
                variant="outline"
                ml={10}
                radius="xl"
                onClick={() => setOpened(false)}
              >
                Cancelar
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>
    </Drawer>
  );
};
