import { BreadcrumbsType } from "@/types/breadcrumbs";
import { TbHome } from "react-icons/tb";
import { StateCreator } from "zustand";

export type BreadCrumbSlice = {
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
});
