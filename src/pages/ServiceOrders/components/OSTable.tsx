import { Th } from "@/components/Th";
import useStore from "@/store";
import { Badge, Center, Group, Table, ThemeIcon, Tooltip } from "@mantine/core";

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
            Número OS
          </Th>
          <Th onSort={handleSort} columnName="name" sort={sort} order={order}>
            Nome
          </Th>
          <Th onSort={handleSort} columnName="cpf" sort={sort} order={order}>
            Documento
          </Th>
          <Th onSort={handleSort} columnName="street" sort={sort} order={order}>
            Endereço
          </Th>

          <Th onSort={handleSort} columnName="status" sort={sort} order={order}>
            Situação
          </Th>
          <Th
            onSort={handleSort}
            columnName="dateCreated"
            sort={sort}
            order={order}
          >
            Data de criação
          </Th>
          <th style={{ width: "6rem" }}>Açoes</th>
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
              <td>{os.client.name}</td>
              <td>{os.client.cpf}</td>
              <td>
                {os.street} ,{os.number}
              </td>
              <td>
                <Badge
                  color={os.orderServiceStatus.id === 1 ? "orange" : "teal"}
                >
                  {os.orderServiceStatus.status}
                </Badge>
              </td>
              <td>{new Date(os.dateCreated).toLocaleDateString("pt-BR")}</td>
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
