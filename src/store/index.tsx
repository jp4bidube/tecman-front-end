import create from "zustand";
import { AuthSlice, createAuthSlice } from "./Auth";
import { BreadCrumbSlice, createBreadCrumbSlice } from "./BreadCrumbSlice";
import { ClientsSlice, createClientsSlice } from "./Clients";
import { createThemeSlice, ThemeSlice } from "./ThemeSlice";
import { createUsersSlice, UsersSlice } from "./Users";

const useStore = create<
  ThemeSlice & BreadCrumbSlice & UsersSlice & AuthSlice & ClientsSlice
>()((...a) => ({
  ...createBreadCrumbSlice(...a),
  ...createThemeSlice(...a),
  ...createUsersSlice(...a),
  ...createAuthSlice(...a),
  ...createClientsSlice(...a),
}));

export default useStore;
