import create from "zustand";
import { AuthSlice, createAuthSlice } from "./Auth";
import { BreadCrumbSlice, createBreadCrumbSlice } from "./BreadCrumbSlice";
import { createThemeSlice, ThemeSlice } from "./ThemeSlice";
import { createUsersSlice, UsersSlice } from "./Users";

const useStore = create<
  ThemeSlice & BreadCrumbSlice & UsersSlice & AuthSlice
>()((...a) => ({
  ...createBreadCrumbSlice(...a),
  ...createThemeSlice(...a),
  ...createUsersSlice(...a),
  ...createAuthSlice(...a),
}));

export default useStore;
