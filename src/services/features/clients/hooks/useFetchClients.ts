import { useQuery } from "react-query";
import { clientsService } from "..";

export const useFetchClients = (
  page: number,
  order: string,
  sort: string,
  search: string
) => {
  return useQuery(["fetchClients", page, order, sort, search], () =>
    clientsService.getClients(page, order, sort, search)
  );
};
