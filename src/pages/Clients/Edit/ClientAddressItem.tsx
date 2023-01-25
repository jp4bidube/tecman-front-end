import { useDeleteClientAddress } from "@/services/features/clients/hooks/useDeleteClientAddress";
import { usePatchClientDefaultAddress } from "@/services/features/clients/hooks/usePatchClientDefaultAddress";
import { usePostClientAddress } from "@/services/features/clients/hooks/usePostClientAddress";
import { useUpdateClientAddress } from "@/services/features/clients/hooks/useUpdateClientAddress";
import { ClientAddress } from "@/types/clients";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  InputBase,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import cep from "cep-promise";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { TbCheck, TbEdit, TbTarget, TbTrash } from "react-icons/tb";
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
  const mutationDelete = useDeleteClientAddress();
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

  const openCofirmDeleteAdressModal = () => {
    openConfirmModal({
      title: <Title order={4}>Deletar endereço</Title>,
      centered: true,
      children: (
        <Text size="sm">
          Essa operação não poderá ser desfeita. Confirma a exclusão do
          endereço?
        </Text>
      ),
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      confirmProps: {
        color: "red",
        radius: "xl",
        variant: "outline",
      },
      cancelProps: { radius: "xl" },
      onConfirm: () => handleDeleteAddress(),
    });
  };

  const handleDeleteAddress = () => {
    mutationDelete.mutate(data.address.id);
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
      <Card.Section>
        <Flex justify="end" pt={10}>
          {!data.defaultAddress ? (
            <ActionIcon color="red" onClick={openCofirmDeleteAdressModal}>
              <TbTrash size={17} />
            </ActionIcon>
          ) : (
            <ActionIcon opacity={0} sx={{ cursor: "auto" }}></ActionIcon>
          )}
        </Flex>
      </Card.Section>
      <form
        onSubmit={action.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <Group position="apart" mt="sm" grow>
          <Text component="label" weight={500} size="sm">
            CEP
          </Text>
          {isEditing ? (
            <Text size="sm" lineClamp={1}>
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
          <Text component="label" weight={500} size="sm">
            Rua
          </Text>
          {isEditing ? (
            <Text size="sm" lineClamp={1}>
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
          <Text component="label" weight={500} size="sm">
            Número
          </Text>
          {isEditing ? (
            <Text size="sm" lineClamp={1}>
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
          <Text component="label" weight={500} size="sm">
            Bairro
          </Text>
          {isEditing ? (
            <Text size="sm" lineClamp={1}>
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
          <Text component="label" weight={500} size="sm">
            Complemento
          </Text>
          {isEditing ? (
            <Text size="sm" lineClamp={1}>
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
