import { useQuery } from "react-query";
import { clientsService } from "..";

interface useFetchClientsProps {
  page: number;
  order: string;
  sort: string;
  search: string;
  enable?: boolean;
}
export const useFetchClients = ({
  page,
  order,
  sort,
  search,
}: useFetchClientsProps) => {
  return useQuery(["fetchClients", page, order, sort, search], () =>
    clientsService.getClients(page, order, sort, search)
  );
};
