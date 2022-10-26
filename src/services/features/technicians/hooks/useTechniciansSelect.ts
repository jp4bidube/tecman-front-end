import { useQuery } from "react-query";
import { techniciansService } from "..";

export const useTechniciansSelect = () => {
  return useQuery(
    ["fetchTechniciansSelect"],
    () => techniciansService.fetchTechniciansSelect(),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
};
