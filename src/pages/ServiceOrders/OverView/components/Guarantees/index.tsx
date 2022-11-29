import { ListOfVisits } from "@/pages/ServiceOrders/components/ListOfVisits";
import { useFetchOSGarantees } from "@/services/features/serviceOrders/hooks/useFetchOSGarantees";
import { ServiceOrders } from "@/types/serviceOrders";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { TbListSearch, TbPlus } from "react-icons/tb";
import { CreateVisit } from "./CreateVisit";

type GuaranteesProps = {
  os: ServiceOrders;
};

const Guarantees = ({ os }: GuaranteesProps) => {
  const [openedCreateVisit, setOpenedCreateVisit] = useState(false);
  const equipmentId = os.equipments[0].id;
  const { data, isFetching } = useFetchOSGarantees(equipmentId);
  console.log(data);
  return (
    <>
      <Flex justify="space-between" pb={20} px={20}>
        <Group mb="md">
          <TbListSearch size={18} />
          <Text component="label" size="sm">
            Todas as visitas
          </Text>
        </Group>
        <Button
          leftIcon={<TbPlus size={20} />}
          radius="xl"
          onClick={() => setOpenedCreateVisit(true)}
        >
          Adicionar
        </Button>
      </Flex>
      {!isFetching && data!.length > 0 ? (
        <Flex justify="flex-start" px={20}>
          <ListOfVisits data={data!} />
        </Flex>
      ) : (
        <Text px={20} size="sm">
          Não há visitas de garantia cadastradas.
        </Text>
      )}

      <CreateVisit
        opened={openedCreateVisit}
        setOpened={setOpenedCreateVisit}
        serviceOrder={os}
      />
    </>
  );
};

export default Guarantees;
