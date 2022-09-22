import { useQuery } from "react-query";
import { usersService } from "..";

export const useUserById = (id: string) => {
  return useQuery(["fetchUserById"], () => usersService.getUserById(id), {
    staleTime: 0,
    cacheTime: 0,
  });
};
