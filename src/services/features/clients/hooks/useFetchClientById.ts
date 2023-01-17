import { useQuery } from "react-query";
import { clientsService } from "..";

export const useFetchClientById = (id: string) => {
  return useQuery(["fetchClientById", id], () =>
    clientsService.getClientById(id)
  );
};
