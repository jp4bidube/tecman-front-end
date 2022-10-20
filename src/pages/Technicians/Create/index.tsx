import useStore from "@/store";
import { useEffect } from "react";
import { IoBuildOutline } from "react-icons/io5";
import { TechniciansCreateForm } from "./TechniciansCreateForm";

export const UserCreate = () => {
  const store = useStore();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Técnicos",
        path: "/technicians/create",
        icon: <IoBuildOutline size={25} />,
        subhead: `Cadastro`,
      }),
    []
  );

  return <TechniciansCreateForm />;
};
