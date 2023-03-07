import { OSFilter } from "@/types/common";
import { useQuery } from "react-query";
import { serviceOrdersService } from "..";

export const useFetchOS = (filters: OSFilter) => {
  return useQuery(
    ["fetchOS", filters],
    () => serviceOrdersService.fetchServiceOrder(filters),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
};
