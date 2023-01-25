import { usePermission } from "@/hooks/usePermission";
import { ListOfVisits } from "@/pages/ServiceOrders/components/ListOfVisits";
import { useFetchOSGarantees } from "@/services/features/serviceOrders/hooks/useFetchOSGarantees";
import { ServiceOrders } from "@/types/serviceOrders";
import {
  Button,
  Divider,
  Flex,
  Grid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { isBefore } from "date-fns";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { CreateVisit } from "./CreateVisit";
import { DeviceInfo } from "./DeviceInfo";

type GuaranteesProps = {
  os: ServiceOrders;
};

const Guarantees = ({ os }: GuaranteesProps) => {
  const [openedCreateVisit, setOpenedCreateVisit] = useState(false);
  const equipmentId = os.equipments[0].id;
  const { data, isFetching } = useFetchOSGarantees(equipmentId);
  const hasPermission = usePermission();

  const allowedCreateVisit = () => {
    if (hasPermission) {
      return !hasPermission;
    }
    if (isBefore(new Date(), new Date(os.equipments[0].warrantyPeriod!))) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Grid px={20} mb={20}>
        <Grid.Col>
          <DeviceInfo data={os} />
        </Grid.Col>
      </Grid>
      <Flex justify="start" px={20} align="center" mb={20}>
        <Divider
          size="xs"
          labelPosition="left"
          label={
            <Title order={5} mr={10}>
              Histórico das visitas de garantia
            </Title>
          }
        />
        <Tooltip
          label="Usuário sem permissão para alterar a garantia"
          withArrow
          color="red.4"
          disabled={!allowedCreateVisit()}
        >
          <span>
            <Button
              leftIcon={<TbPlus size={20} />}
              radius="xl"
              onClick={() => setOpenedCreateVisit(true)}
              disabled={allowedCreateVisit()}
            >
              Adicionar
            </Button>
          </span>
        </Tooltip>
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
