import { useQuery } from "react-query";
import { usersService } from "..";

export const useFetchUsers = (
  page: number,
  order: string,
  sort: string,
  search: string
) => {
  return useQuery(["fetchUsers", page, order, sort, search], () =>
    usersService.getUsers(page, order, sort, search)
  );
};
