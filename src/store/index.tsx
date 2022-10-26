import create from "zustand";
import { createAuthSlice, AuthSlice } from "./Auth";
import { createBreadCrumbSlice, BreadCrumbSlice } from "./BreadCrumbSlice";
import { createClientsSlice, ClientsSlice } from "./Clients";
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
