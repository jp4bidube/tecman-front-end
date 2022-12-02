import { Th } from "@/components/Th";
import useStore from "@/store";
import {
  Badge,
  Center,
  Group,
  Table,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";

import { ServiceOrders } from "@/types/serviceOrders";
import { User } from "@/types/user";
import { TbEdit, TbSearch, TbUser, TbUserOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { OSTableSkeleton } from "../List/OSTableSkeleton";

type OSTableProps = {
  serviceOrders: ServiceOrders[] | undefined;
  isFetching: boolean;
};

export const OSTable = ({ serviceOrders, isFetching }: OSTableProps) => {
  const navigate = useNavigate();
  const store = useStore();
  const { sort, order } = store.serviceOrdersFilter;

  const handleSort = (column: string) => {
    store.setServiceOrdersFilter({
      ...store.serviceOrdersFilter,
      sort: column,
      order: order === "desc" ? "asc" : "desc",
    });
  };

  return (
    <Table verticalSpacing="sm" striped>
      <thead>
        <tr>
          <Th onSort={handleSort} columnName="id" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Número OS
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="name" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Nome
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="cpf" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Documento
            </Text>
          </Th>
          <Th onSort={handleSort} columnName="street" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Endereço
            </Text>
          </Th>

          <Th onSort={handleSort} columnName="status" sort={sort} order={order}>
            <Text size="xs" tt="capitalize">
              Situação
            </Text>
          </Th>
          <Th
            onSort={handleSort}
            columnName="dateCreated"
            sort={sort}
            order={order}
          >
            <Text size="xs" tt="capitalize">
              Data de criação
            </Text>
          </Th>
          <th style={{ width: "6rem" }}>
            <Text size="xs" tt="capitalize">
              Açoes
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {isFetching ? (
          <OSTableSkeleton />
        ) : (
          serviceOrders &&
          serviceOrders.map((os) => (
            <tr key={os.id}>
              <td>
                <Badge variant="dot">{os.id}</Badge>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {os.client.name}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {os.client.cpf}
                </Text>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {os.street}, {os.number}
                </Text>
              </td>
              <td>
                <Badge
                  color={os.orderServiceStatus.id === 1 ? "orange" : "teal"}
                >
                  <Text size="xs" tt="capitalize">
                    {os.orderServiceStatus.status}
                  </Text>
                </Badge>
              </td>
              <td>
                <Text size="xs" tt="capitalize">
                  {new Date(os.dateCreated).toLocaleDateString("pt-BR")}
                </Text>
              </td>
              <td>
                <Group>
                  <Tooltip label="Visualizar" withArrow>
                    <ThemeIcon
                      variant="light"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/service-orders/${os.id}/over-view`)
                      }
                    >
                      <TbSearch />
                    </ThemeIcon>
                  </Tooltip>
                </Group>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
