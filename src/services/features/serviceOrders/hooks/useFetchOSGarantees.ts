import { useQuery } from "react-query";
import { serviceOrdersService } from "..";

export const useFetchOSGarantees = (equipmentId: number) => {
  return useQuery(
    ["fetchOSGarantees"],
    () => serviceOrdersService.fetchOSGarantees(equipmentId),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
};
