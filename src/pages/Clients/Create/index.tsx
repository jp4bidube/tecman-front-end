import useStore from "@/store";
import { useEffect } from "react";
import { TbUserCircle } from "react-icons/tb";
import { ClientCreateForm } from "./ClientCreateForm";

export const UserCreate = () => {
  const store = useStore();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Funcionários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
        subhead: `Cadastro`,
      }),
    []
  );

  return <ClientCreateForm />;
};
