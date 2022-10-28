import { Filter } from "@/types/common";
import { StateCreator } from "zustand";

export type TechniciansSlice = {
  techniciansFilter: Filter;
  setTechniciansPage: (page: number) => void;
  setTechniciansFilter: (filter: Filter) => void;
};

export const createTechniciansSlice: StateCreator<TechniciansSlice> = (
  set
) => ({
  techniciansFilter: {
    page: 1,
    order: "desc",
    search: "",
    sort: "name",
  },
  setTechniciansPage(page) {
    set((state) => ({
      ...state,
      techniciansFilter: { ...state.techniciansFilter, page },
    }));
  },
  setTechniciansFilter(filter) {
    set((state) => ({
      ...state,
      techniciansFilter: filter,
    }));
  },
});
