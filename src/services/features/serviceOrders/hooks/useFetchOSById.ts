import { useQuery } from "react-query";
import { serviceOrdersService } from "..";

export const useFetchOSById = (id: string) => {
  return useQuery(
    ["fetchOSById"],
    () => serviceOrdersService.fetchServiceOrderById(id),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
};
