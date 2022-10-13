import { usePatchClientDefaultAddress } from "@/services/features/clients/hooks/usePatchClientDefaultAddress";
import { usePostClientAddress } from "@/services/features/clients/hooks/usePostClientAddress";
import { useUpdateClientAddress } from "@/services/features/clients/hooks/useUpdateClientAddress";
import { ClientAddress } from "@/types/clients";
import {
  Badge,
  Button,
  Card,
  Group,
  InputBase,
  Text,
  TextInput,
} from "@mantine/core";
import cep from "cep-promise";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { TbCheck, TbEdit, TbTarget } from "react-icons/tb";
import InputMask from "react-input-mask";
import { validateClientAddress } from "./validationSchema";

type ClientAddressItemProps = {
  id: number;
  data: ClientAddress;
  onRemoveItem: (key: string) => void;
};

export const ClientAddressItem = ({
  id,
  data,
  onRemoveItem,
}: ClientAddressItemProps) => {
  const mutationEdit = useUpdateClientAddress();
  const mutationCreate = usePostClientAddress();
  const mutationDefault = usePatchClientDefaultAddress();

  const formik = useFormik({
    initialValues: {
      street: data.address.street,
      cep: data.address.cep,
      number: data.address.number,
      district: data.address.district,
      complement: data.address.complement,
      defaultAddress: data.defaultAddress,
    },
    validationSchema: validateClientAddress,
    onSubmit: (values) => {
      if (data.id) {
        return mutationEdit.mutate({
          id: data.address.id,
          payload: { ...values },
        });
      }
      return mutationCreate.mutate({ id, payload: { ...values } });
    },
  });

  const { values, errors, touched, ...action } = formik;

  const [isEditing, setIsEditing] = useState(data.id !== "");

  const handleCancel = () => {
    if (data.id === "") {
      onRemoveItem(data.clientId);
    }
    setIsEditing(!isEditing);
  };

  const handleSearchCep = async (cepNumber: string) => {
    const { street, neighborhood } = await cep(cepNumber);
    action.setFieldValue("street", street);
    action.setFieldValue("district", neighborhood);
  };

  const handleEditAddress = useCallback(() => {
    setIsEditing(!isEditing);
  }, []);

  const handleChangeDefaultAddress = () => {
    mutationDefault.mutate({
      id,
      payload: { addressId: parseInt(data.address.id) },
    });
  };

  return (
    <Card
      shadow="sm"
      px="lg"
      py="sm"
      mr="lg"
      radius="md"
      mb="xs"
      withBorder
      sx={{
        width: "25rem",
        display: "inline-block",
      }}
    >
      <form onSubmit={action.handleSubmit}>
        <Group position="apart" mt="sm" grow>
          <Text weight={500}>CEP</Text>
          {isEditing ? (
            <Text size="sm" color="dimmed" lineClamp={1}>
              {data.address.cep}
            </Text>
          ) : (
            <InputBase
              placeholder="CEP"
              variant="filled"
              name="cep"
              id="cep"
              value={values.cep}
              onChange={action.handleChange}
              onBlur={(e) => handleSearchCep(e.target.value)}
              error={touched.cep && errors.cep}
              component={InputMask}
              mask="99.999-999"
            />
          )}
        </Group>
        <Group position="apart" mt="sm" grow>
          <Text weight={500}>Rua</Text>
          {isEditing ? (
            <Text size="sm" color="dimmed" lineClamp={1}>
              {data.address.street}
            </Text>
          ) : (
            <TextInput
              variant="filled"
              placeholder="Rua"
              name="street"
              id="street"
              value={values.street}
              onChange={action.handleChange}
              error={touched.street && errors.street}
            />
          )}
        </Group>
        <Group position="apart" mt="sm" grow>
          <Text weight={500}>Número</Text>
          {isEditing ? (
            <Text size="sm" color="dimmed" lineClamp={1}>
              {data.address.number}
            </Text>
          ) : (
            <TextInput
              variant="filled"
              placeholder="Número"
              id="number"
              name="number"
              value={values.number}
              onChange={action.handleChange}
              error={touched.number && errors.number}
            />
          )}
        </Group>
        <Group position="apart" mt="sm" grow>
          <Text weight={500}>Bairro</Text>
          {isEditing ? (
            <Text size="sm" color="dimmed" lineClamp={1}>
              {data.address.district}
            </Text>
          ) : (
            <TextInput
              variant="filled"
              placeholder="Bairro"
              name="district"
              id="district"
              value={values.district}
              onChange={action.handleChange}
              error={touched.district && errors.district}
            />
          )}
        </Group>
        <Group position="apart" mt="sm" grow>
          <Text weight={500}>Complemento</Text>
          {isEditing ? (
            <Text size="sm" color="dimmed" lineClamp={1}>
              {data.address.complement}
            </Text>
          ) : (
            <TextInput
              variant="filled"
              placeholder="Complemento"
              name="complement"
              id="complement"
              value={values.complement}
              onChange={action.handleChange}
            />
          )}
        </Group>
        <Card.Section
          withBorder
          inheritPadding
          py="xs"
          mt={isEditing ? "1.9rem" : "xs"}
        >
          <Group>
            {isEditing ? (
              <Group position="apart">
                <></>
                <Button
                  variant="light"
                  color="primary"
                  leftIcon={<TbEdit />}
                  onClick={handleEditAddress}
                >
                  <Text>Editar</Text>
                </Button>
                {!data.defaultAddress ? (
                  <Button
                    variant="outline"
                    color="gray"
                    leftIcon={<TbTarget />}
                    onClick={handleChangeDefaultAddress}
                  >
                    <Text>Tornar padrão</Text>
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    color="green"
                    sx={{ cursor: "auto " }}
                  >
                    Endereço Padrão
                  </Button>
                )}
              </Group>
            ) : (
              <Group>
                <Button variant="light" type="submit" leftIcon={<TbCheck />}>
                  <Text>Salvar</Text>
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <Text>cancel</Text>
                </Button>
              </Group>
            )}
          </Group>
        </Card.Section>
      </form>
    </Card>
  );
};
