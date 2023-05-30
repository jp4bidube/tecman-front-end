import { Th } from "@/components/Th";
import useStore from "@/store";
import { Badge, Group, Table, Text, ThemeIcon, Tooltip } from "@mantine/core";

import { OSTableSkeleton } from "@/pages/ServiceOrders/List/OSTableSkeleton";
import { ServiceOrders } from "@/types/serviceOrders";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { checkStatusColor } from "@/utils/checkStatus";

type OSTableProps = {
  serviceOrders: ServiceOrders[] | undefined;
  isFetching: boolean;
};

export const ClientsOSTable = ({ serviceOrders, isFetching }: OSTableProps) => {
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
    <>
      {isFetching ? (
        <OSTableSkeleton />
      ) : (
        <Table verticalSpacing="sm" striped>
          <thead>
            <tr>
              <Th onSort={handleSort} columnName="id" sort={sort} order={order}>
                <Text size="xs" tt="capitalize">
                  Número OS
                </Text>
              </Th>
              <Th
                onSort={handleSort}
                columnName="street"
                sort={sort}
                order={order}
              >
                <Text size="xs" tt="capitalize">
                  Endereço
                </Text>
              </Th>

              <Th
                onSort={handleSort}
                columnName="status"
                sort={sort}
                order={order}
              >
                <Text size="xs" tt="capitalize">
                  Situação
                </Text>
              </Th>
              <Th
                onSort={handleSort}
                columnName="cpf"
                sort={sort}
                order={order}
              >
                <Text size="xs" tt="capitalize">
                  Data criação
                </Text>
              </Th>
              <th style={{ width: "6rem" }}>
                <Text size="xs" tt="capitalize">
                  Ações
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceOrders &&
              serviceOrders.map((os) => (
                <tr key={os.id}>
                  <td>
                    <Badge variant="dot">{os.id}</Badge>
                  </td>
                  <td>
                    <Text size="xs" tt="capitalize">
                      {os.street}, {os.number}
                    </Text>
                  </td>
                  <td>
                    <Badge color={checkStatusColor(os?.orderServiceStatus?.id)}>
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
                      <Tooltip label="Editar" withArrow>
                        <ThemeIcon
                          variant="light"
                          sx={{ cursor: "pointer" }}
                          onClick={() => navigate(`${os.id}/over-view`)}
                        >
                          <TbEdit />
                        </ThemeIcon>
                      </Tooltip>
                    </Group>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
