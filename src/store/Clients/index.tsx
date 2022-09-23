import { ClientsFilter } from "@/types/clients";
import { StateCreator } from "zustand";

export type ClientsSlice = {
  clientsFilter: ClientsFilter;
  setPage: (page: number) => void;
  setClientsFilter: (filter: ClientsFilter) => void;
};

export const createClientsSlice: StateCreator<ClientsSlice> = (set) => ({
  clientsFilter: {
    page: 1,
    order: "desc",
    search: "",
    sort: "name",
  },
  setPage(page) {
    set((state) => ({
      ...state,
      clientsFilter: { ...state.clientsFilter, page: page },
    }));
  },
  setClientsFilter(filter) {
    set((state) => ({
      ...state,
      clientsFilter: filter,
    }));
  },
});
