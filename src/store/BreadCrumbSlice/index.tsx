import { BreadcrumbsType, SubheadObject } from "@/types/breadcrumbs";
import { TbHome } from "react-icons/tb";
import { StateCreator } from "zustand";

export type BreadCrumbSlice = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  breadcrumb: BreadcrumbsType;
  setNewBreadcrumbs: (breadcrumbs: BreadcrumbsType) => void;
  addBreadcrumbSubhead: (subhead: SubheadObject[]) => void;
};

export const createBreadCrumbSlice: StateCreator<BreadCrumbSlice> = (set) => ({
  breadcrumb: {
    name: "Home",
    path: "/",
    icon: <TbHome size={20} />,
    subhead: [],
  },
  setNewBreadcrumbs(breadcrumb) {
    set((state) => ({
      ...state,
      breadcrumb,
    }));
  },
  addBreadcrumbSubhead(subhead) {
    set((state) => ({
      ...state,
      breadcrumb: {
        ...state.breadcrumb,
        subhead,
      },
    }));
  },
  isMenuOpen: false,
  setIsMenuOpen(isMenuOpen) {
    set((state) => ({
      ...state,
      isMenuOpen,
    }));
  },
});
