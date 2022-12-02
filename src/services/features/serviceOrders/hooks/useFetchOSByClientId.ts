import { Filter } from "@/types/common";
import { useQuery } from "react-query";
import { serviceOrdersService } from "..";

export const useFetchOSByClientId = (id: number, filters: Filter) => {
  return useQuery(
    ["fetchOSByClientId", filters],
    () => serviceOrdersService.fetchServiceOrderByClientId(id, filters),
    {
      staleTime: 1000,
      cacheTime: 1000,
    }
  );
};
