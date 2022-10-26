import { LoggedUser, UserFilter } from "@/types/user";
import { StateCreator } from "zustand";

export type UsersSlice = {
  loggedUser: LoggedUser;
  setLoggedUser: (user: LoggedUser) => void;
  usersFilter: UserFilter;
  setUsersPage: (page: number) => void;
  setUsersFilter: (filter: UserFilter) => void;
};

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
  loggedUser: { username: "", name: "", role: "", avatarUrl: "", email: "" },
  setLoggedUser(user) {
    set((state) => ({ ...state, loggedUser: user }));
  },
  usersFilter: {
    page: 1,
    order: "desc",
    search: "",
    sort: "name",
  },
  setUsersPage(page) {
    set((state) => ({
      ...state,
      usersFilter: { ...state.usersFilter, page },
    }));
  },
  setUsersFilter(filter) {
    set((state) => ({
      ...state,
      usersFilter: filter,
    }));
  },
});
