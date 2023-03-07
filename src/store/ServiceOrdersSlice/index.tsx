import { OSFilter } from "@/types/common";
import { StateCreator } from "zustand";

export type OSSlice = {
  serviceOrdersFilter: OSFilter;
  setServiceOrdersPage: (page: number) => void;
  setServiceOrdersFilter: (filter: OSFilter) => void;
};

export const createOSSlice: StateCreator<OSSlice> = (set) => ({
  serviceOrdersFilter: {
    page: 1,
    order: "desc",
    search: "",
    sort: "name",
    select: "",
  },
  setServiceOrdersPage(page) {
    set((state) => ({
      ...state,
      serviceOrdersFilter: { ...state.serviceOrdersFilter, page },
    }));
  },
  setServiceOrdersFilter(filter) {
    set((state) => ({
      ...state,
      serviceOrdersFilter: filter,
    }));
  },
});
