import create from "zustand";
import { createAuthSlice, AuthSlice } from "./Auth";
import { createBreadCrumbSlice, BreadCrumbSlice } from "./BreadCrumbSlice";
import { createClientsSlice, ClientsSlice } from "./Clients";
import { createThemeSlice, ThemeSlice } from "./ThemeSlice";
import { createUsersSlice, UsersSlice } from "./Users";
import { createTechniciansSlice, TechniciansSlice } from "./Technicians";

const useStore = create<
  ThemeSlice &
    BreadCrumbSlice &
    UsersSlice &
    AuthSlice &
    ClientsSlice &
    TechniciansSlice
>()((...a) => ({
  ...createBreadCrumbSlice(...a),
  ...createThemeSlice(...a),
  ...createUsersSlice(...a),
  ...createAuthSlice(...a),
  ...createClientsSlice(...a),
  ...createTechniciansSlice(...a),
}));

export default useStore;
