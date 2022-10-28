import { Filter } from "@/types/common";
import { useQuery } from "react-query";
import { techniciansService } from "..";

export const useFetchTechnicians = (filters: Filter) => {
  return useQuery(
    ["fetchTechnicians", filters],
    () => techniciansService.fetchTechnicians(filters),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
};
