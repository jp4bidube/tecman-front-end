import useStore from "@/store";
import { useEffect } from "react";
import { ClientCreateForm } from "./ClientCreateForm";

export const ClientCreate = () => {
  const store = useStore();

  useEffect(
    () =>
      store.addBreadcrumbSubhead([
        {
          name: "Cadastro",
          path: "/clients/create",
        },
      ]),
    []
  );

  return <ClientCreateForm />;
};
