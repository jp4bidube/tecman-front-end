import { useFetchOSById } from "@/services/features/serviceOrders/hooks/useFetchOSById";
import useStore from "@/store";
import { useEffect } from "react";
import { TbAd2 } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { OSEditForm } from "./OSEditForm";

export const ServiceOrdersEdit = () => {
  const store = useStore();

  const { id } = useParams();
  const { data, isLoading } = useFetchOSById(id || "");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
        subhead: `Edição - ${data?.id}`,
      }),
    []
  );

  return !isLoading ? <OSEditForm os={data!} /> : null;
};
