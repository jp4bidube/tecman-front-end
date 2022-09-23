import { useQuery } from "react-query";
import { clientsService } from "..";

export const useFetchClientById = (id: string) => {
  return useQuery(["fetchClientById"], () => clientsService.getClientById(id), {
    staleTime: 0,
    cacheTime: 0,
  });
};
