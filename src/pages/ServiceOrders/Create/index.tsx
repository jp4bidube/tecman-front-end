import useStore from "@/store";
import { useEffect } from "react";
import { TbAd2 } from "react-icons/tb";
import { useOutletContext } from "react-router-dom";
import { OSCreateForm } from "./OSCreateForm";

export const ServiceOrdersCreate = () => {
  const store = useStore();
  const client = useOutletContext();

  useEffect(() => {
    if (!client) {
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
        subhead: [{ name: "Cadastro", path: "/service-orders/create" }],
      });
    }
  }, [client]);

  return <OSCreateForm />;
};
