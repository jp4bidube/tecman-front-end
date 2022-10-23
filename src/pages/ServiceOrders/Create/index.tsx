import useStore from "@/store";
import { useEffect } from "react";
import { TbAd2 } from "react-icons/tb";
import { OSCreateForm } from "./OSCreateForm";

export const ServiceOrdersCreate = () => {
  const store = useStore();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
        subhead: `Cadastro`,
      }),
    []
  );

  return <OSCreateForm />;
};
