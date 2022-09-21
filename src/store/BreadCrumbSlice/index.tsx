import { BreadcrumbsType } from "@/types/breadcrumbs";
import { TbHome } from "react-icons/tb";
import { StateCreator } from "zustand";

export type BreadCrumbSlice = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  breadcrumb: BreadcrumbsType;
  setNewBreadcrumbs: (breadcrumbs: BreadcrumbsType) => void;
};

export const createBreadCrumbSlice: StateCreator<BreadCrumbSlice> = (set) => ({
  breadcrumb: {
    name: "Home",
    path: "/",
    icon: <TbHome size={25} />,
  },
  setNewBreadcrumbs(breadcrumb) {
    set((state) => ({
      ...state,
      breadcrumb,
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
