import useStore from "@/store";
import { useEffect } from "react";
import { TbUsers } from "react-icons/tb";
import { ClientCreateForm } from "./ClientCreateForm";

export const ClientCreate = () => {
  const store = useStore();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Clientes",
        path: "/clients",
        icon: <TbUsers size={25} />,
        subhead: `Cadastro`,
      }),
    []
  );

  return <ClientCreateForm />;
};
